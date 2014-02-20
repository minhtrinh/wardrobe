/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'fileSystem',
    'camera',
    'state',
    'notification',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging, $fileSystem, $camera, $state, $notification) {
    'use strict';

    var ImagespageView = Backbone.View.extend({
        template: JST['imagesGallery-template'],
        initialize: function() {
            _.bindAll(this, 'render', 'removeImage', 'onConfirmNewImage', 'onConfirmEditImage', 'createNewImage');
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.$el.hammer();

            this.selectedImage = null;
        },
        events: {

            // User press and hold on an image
            'hold .image-thumbnails': function(event) {
                var id = event.target.id;

                var thisView = this;

                $notification.confirm(
                    '',
                    this.onConfirmEditImage,
                    'Foto bearbeiten',
                    ['Löschen','Bearbeiten','Abbrechen']
                );
            },

            // Add new image in this category
            'tap .new-image': function(event) {
                var thisView = this;

                $notification.confirm(
                    '',
                    this.onConfirmNewImage,
                    'Foto hinzufügen',
                    ['Erfassen','Bibliothek','Album', 'Abbrechen']
                );
            },
        },
        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            return this;
        },

        removeImage: function(id) {
            this.collection.removeModelById(id);
            this.notification.hide();
        },

        onConfirmEditImage: function(buttonId) {
            switch(buttonId) {
                case 1: // Delete
                this.removeCategory(this.selectedCategory);
                break;
                case 2: // Edit
                this.editCategory(this.selectedCategory);
                break;
                default: // Cancel
                break;
            }

            this.selectedImage = null;
        },
        onConfirmNewImage: function(buttonId) {
            var thisView = this;

            switch(buttonId) {
            case 1: // Capture photo

                // Use camera service to capture photo
                $camera.capturePhoto(
                    function(result) {
                        var imageFileData = {
                            imageData: result,
                            categoryId: $state.getCurrentCategoryId(),

                            // create new object for captured photo
                            callback: thisView.createNewImage
                        };

                        // Persist photo to app folder
                        $fileSystem.saveImage(imageFileData);
                    }
                );
                break;
            case 2: // From photo library
                $camera.getFromLibrary(
                    function(result) {
                        var imageFileData = {
                            imageData: result,
                            categoryId: $state.getCurrentCategoryId(),

                            // create new object for selected photo
                            callback: thisView.createNewImage
                        };

                        // Persist photo to app folder
                        $fileSystem.saveImage(imageFileData);
                    }
                );
                break;
            case 3: // From saved photo album

                $camera.getFromPhotoAlbum(
                    function(result) {
                        var imageFileData = {
                            imageData: result,
                            categoryId: $state.getCurrentCategoryId(),

                            // create new object for selected photo
                            callback: thisView.createNewImage
                        };

                        // Persist photo to app folder
                        $fileSystem.saveImage(imageFileData);
                    }
                );
                break;
            default: // Cancel
                break;
            }
        },
        createNewImage: function(imgPath) {
            this.collection.createOrUpdateModel({
                id: null,
                path: imgPath,
                category: $state.getCurrentCategoryId()
            });
        }
    });

    return ImagespageView;
});
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
    'data',
    'state',
    'notification'
], function ($, _, Backbone, JST, mustache, $logging, $fileSystem, $camera, $data, $state, $notification) {
    'use strict';

    var ImagespageView = Backbone.View.extend({
        template: JST['imagesGallery-template'],

        initialize: function() {
            _.bindAll(this, 'render', 'loadData', 'removeImage', 'updateCategoryThumbs',
                'onConfirmNewImage', 'onConfirmEditImage', 'createNewImage',
                'removeEvents', 'onTapAddImage', 'onImageHold');

            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'change', this.render);

            this.selectedImage = null;
            this.categoryId = $state.getCurrentCategoryId();
        },

        events: {

            // User press and hold on an image
            'hold .image-thumbnails': 'onImageHold',

            // Add new image in this category
            'tap .new-image': 'onTapAddImage',
        },

        render: function() {

            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            return this;
        },

        /**
         * Callback for Event: Hold on an image
         * @param {Object} event
         */
        onImageHold: function(event) {
            var id = event.target.id;

            $logging.d('imagesGallery: Hold on image: ' + id);

            // var thisView = this;
            this.selectedImage = id;

            $notification.confirm(
                '',
                this.onConfirmEditImage,
                'Foto',
                ['Löschen','Bearbeiten','Abbrechen']
            );
        },

        /**
         * Callback for Event: Tap on button "Add new image"
         *
         * @param {Object} event
         */
        onTapAddImage: function(event) {
            $logging.d('imagesGallery: Tap on add image');

            $notification.confirm(
                'Quelle auswählen',
                this.onConfirmNewImage,
                'Foto hinzufügen',
                ['Kamera','Bibliothek', 'Abbrechen']
            );
        },

        loadData: function() {
            $logging.d('imagesGallery: Load new data');

            // Remove all binded events to DOM before attaching again
            this.removeEvents();

            var thisView = this;

            $data.getImagesByCategory(thisView.categoryId, function(images) {
                thisView.collection = images;
                thisView.render();
            });

        },

        removeImage: function(id) {
            $logging.d('imagesGallery: RemoveImage ' + id);

            var thisView = this;

            $data.removeImage(id, function() {
                thisView.loadData();
                thisView.updateCategoryThumbs();
            });

            // this.notification.hide();
        },

        onConfirmEditImage: function(buttonId) {
            $logging.d('imagesGallery: Confirm edit image: ' + buttonId);

            switch(buttonId) {
            case 1: // Delete
                this.removeImage(this.selectedImage);
                break;
            case 2: // Edit
                this.editImage(this.selectedImage);
                break;
            default: // Cancel
                break;
            }

            this.selectedImage = null;
        },
        onConfirmNewImage: function(buttonId) {
            $logging.d('imagesGallery: Confirm add new image: ' + buttonId);
            var thisView = this;

            switch(buttonId) {
            case 1: // Capture photo

                // Use camera service to capture photo
                $camera.capturePhoto(
                    function(result) {
                        var imageFileData = {
                            imageData: result,
                            categoryId: thisView.categoryId,

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
                        console.log(result);

                        var imageFileData = {
                            imageData: result,
                            categoryId: thisView.categoryId,

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
            $logging.d('imagesGallery: Create new image: ' + imgPath);

            $data.getImageItems().createOrUpdateModel({
                id: null,
                path: imgPath,
                category: $state.getCurrentCategoryId(),
                time: (new Date()).getTime()
            });

            this.updateCategoryThumbs();

            // Update this view
            this.loadData();
        },

        updateCategoryThumbs: function() {
            $data.updateCategoryThumbnail(this.categoryId);
        },

        removeEvents: function() {
            $logging.d('imagesGallery: Remove binded events');
            this.$el.find('.image-thumbnails').off('hold', this.onImageHold);
            this.$el.find('.new-image').off('tap', this.onTapAddImage);
        }
    });

    return ImagespageView;
});
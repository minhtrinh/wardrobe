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
    'views/notification',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging, $fileSystem, $camera, Notification) {
    'use strict';

    var ImagespageView = Backbone.View.extend({
        template: JST['imagesGallery-template'],
        initialize: function() {
            $logging.d(this.collection);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.$el.hammer();

            // Render modal view to #notification
            this.notification = new Notification();
            this.notification.render();
        },
        events: {
            'hold .image-thumbnails': function(event) {
                var id = event.target.id;

                var thisView = this;

                this.notification.setTitle('Photo');
                this.notification.setLeftButton('Löschen', function() {
                    thisView.removeImage(id);
                });
                this.notification.setRightButton('Bearbeiten', function() {
                    // thisView.editCategory(id);
                });
                this.notification.show();
            },
            'tap .new-image': function(event) {
                var thisView = this;

                $camera.capturePhoto(
                    function(result) {
                        console.log(result);
                        // thisView.$('img.new-image').attr('src', 'data:image/jpeg;base64,' + result);
                        // thisView.collection.createOrUpdateModel({
                            // path: 'data:image/jpeg;base64,' + result,
                        // });
                    },
                    function(error) {
                        $logging.e(error);
                    }
                );
            },
        },
        render: function() {
            var thisView = this;
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));

            // $fileSystem.getImagesInDir('Download', function(imgPaths) {
                // $logging.d(imgPaths);
                // thisView.$el.html(mustache.render(thisView.template, imgPaths));
//
            // });
            return this;
        },
        removeImage: function(id) {
            this.collection.removeModelById(id);
            this.notification.hide();
        }
    });

    return ImagespageView;
});
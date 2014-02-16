/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'fileSystem',
    'views/notification',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging, $fileSystem, Notification) {
    'use strict';

    var ImagespageView = Backbone.View.extend({
        template: JST['imagesGallery-template'],
        initialize: function() {
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

                this.notification.setTitle('Kategorie bearbeiten');
                this.notification.setLeftButton('Löschen', function() {
                    thisView.removeCategory(id);
                });
                this.notification.setRightButton('Bearbeiten', function() {
                    thisView.editCategory(id);
                });
                this.notification.show();
            },
        },
        render: function() {
            var thisView = this;

            $fileSystem.getImagesInDir('Download', function(imgPaths) {
                $logging.d(imgPaths);
                thisView.$el.html(mustache.render(thisView.template, imgPaths));

            });
            return this;
        }
    });

    return ImagespageView;
});
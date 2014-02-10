/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'fileSystem'
], function ($, _, Backbone, JST, mustache, $logging, $fileSystem) {
    'use strict';

    var ImagespageView = Backbone.View.extend({
        template: JST['imagesGallery-template'],
        render: function() {
            var that = this;

            $fileSystem.getImagesInDir('Download', function(imgPaths) {
                $logging.d(imgPaths);
                that.$el.html(mustache.render(that.template, imgPaths));

            });
            return this;
        },
        // TODO: need to check how to handle close event of Backbone.View
        close: function() {
            $logging.d('Closing imagesGallery');
        }
    });

    return ImagespageView;
});
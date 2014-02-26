/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'data',
    'fileSystem'
], function ($, _, Backbone, JST, mustache, $logging, $data, $fileSystem) {
    'use strict';

    var DetailsView = Backbone.View.extend({
        template: JST['details-template'],
        render: function() {
            this.$el.html(mustache.render(this.template));

            var thisView = this;

            // $fileSystem.getAllImages(function(images) {
                // thisView.$el.find('ul.inline-list').append('<li><a class="th"><img src="' + images + '"></a></li>');
            // });
            return thisView;
        }
    });

    return DetailsView;
});
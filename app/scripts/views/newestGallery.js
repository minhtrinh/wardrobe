/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging'
], function ($, _, Backbone, JST, mustache, $logging) {
    'use strict';

    var NewestgalleryView = Backbone.View.extend({
        template: JST['newestGallery-template'],
        initialize: function() {
            console.log('Init Newest');
        },
        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            console.log(this.collection);
            return this;
        }
    });

    return NewestgalleryView;
});
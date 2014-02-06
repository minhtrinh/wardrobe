/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'logging',
    'templates',
    'mustache',
    'data'
], function ($, _, Backbone, $logging, JST, mustache, $data) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['main-template'],
        render: function() {

            // Get categories from data service
            var categories = $data.getCategoryItems();

            this.$el.html(mustache.render(this.template, categories.toJSON()));
            return this;
        }
    });

    return MainView;
});
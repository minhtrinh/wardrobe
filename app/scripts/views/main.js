/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache'
], function ($, _, Backbone, JST, mustache) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['main-template'],
        render: function() {
            this.$el.html(mustache.render(this.template));
            return this;
        }
    });

    return MainView;
});
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache'
], function ($, _, Backbone, JST, mustache) {
    'use strict';

    var TopbarView = Backbone.View.extend({
        template: JST['topbar-template'],

        render: function() {
            this.$el.html(mustache.render(this.template));
            return this;
        }
    });

    return TopbarView;
});
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache'
], function ($, _, Backbone, JST, mustache) {
    'use strict';

    var DetailsView = Backbone.View.extend({
        template: JST['details-template'],
        render: function() {
            this.$el.html(mustache.render(this.template));
            return this;
        }
    });

    return DetailsView;
});
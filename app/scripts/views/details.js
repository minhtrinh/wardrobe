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
            console.log('render details', this.model);
            this.$el.html(mustache.render(this.template, this.model.toJSON()));
            return this;
        }
    });

    return DetailsView;
});
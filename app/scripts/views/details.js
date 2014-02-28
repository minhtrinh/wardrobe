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
            // TODO: TEST
            if (!_.isUndefined(this.model)) {
                this.$el.html(mustache.render(this.template, this.model.toJSON()));
            } else {
                this.$el.html(mustache.render(this.template));
            }

            return this;
        }
    });

    return DetailsView;
});
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

    var CategoriespageView = Backbone.View.extend({
        template: JST['categoriesSlide-template'],
        events: {
        },
        render: function() {
            $logging.d('Render Category slide');
            this.$el.html(mustache.render(this.template, this.model));
            return this;
        },
        // TODO: need to check how to handle close event of Backbone.View
        close: function() {
            $logging.d('Closing categoriesSlide');
        }
    });

    return CategoriespageView;
});
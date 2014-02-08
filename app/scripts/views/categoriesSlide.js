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
            'click .category-thumbnails': function(event) {
                $logging.d('click on category-thumbnails');
                // Backbone.history.navigate('gallery', {trigger: true});
            }
        },
        render: function() {
            this.$el.html(mustache.render(this.template, this.model));
            return this;
        },
        close: function() {
            $logging.d('Closing categoriesSlide');
        }
    });

    return CategoriespageView;
});
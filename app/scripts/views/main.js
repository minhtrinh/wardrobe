/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'logging',
    'templates',
    'mustache',
    'data',
    'views/categoriesSlide'
], function ($, _, Backbone, $logging, JST, mustache, $data, CategoriesSlide) {
    'use strict';

    var MainView = Backbone.View.extend({
        template: JST['main-template'],
        render: function() {
            $logging.d('Render MainView');
            this.$el.html(mustache.render(this.template, categories));

            // Get categories from data service
            var categories = $data.getCategoryItems().toJSON();

            // Add an extra category "Add new category"
            categories.push({id:'new', image:'http://placehold.it/150x150'});

            // Split categories to fit for slide pages, using Underscore - see http://underscorejs.org/#groupBy
            var pages = _.groupBy(categories, function(item, index) {
                return Math.floor(index / 6);
            });
            pages = _.toArray(pages);

            var that = this;

            // Create a categories page for an orbit slide
            _.each(pages, function(page) {
                $logging.d(page);
                var categoriesSlide = new CategoriesSlide({model: page});
                that.$('.main-orbit').append(categoriesSlide.render().el);
            });
            return this;
        },
        // TODO: need to check how to handle close event of Backbone.View
        close: function() {
            $logging.d('Closing main page');
        }
    });

    return MainView;
});
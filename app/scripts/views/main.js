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
            var categories = $data.getCategoryItems();
            categories = categories.toJSON();

            // Split categories to fit for slide pages, see http://underscorejs.org/#groupBy
            var pages = _.groupBy(categories, function(item, index) {
                return Math.floor(index/6);
            });
            pages = _.toArray(pages);

            var that = this;

            _.each(pages, function(page) {
                $logging.d(page);
                var categoriesSlide = new CategoriesSlide({model: page});
                that.$('.main-orbit').append(categoriesSlide.render().el);
            });
            return this;
        },
        close: function() {
            $logging.d('Closing main page');
        }
    });

    return MainView;
});
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
        initialize: function() {

            // Get categories from data service
            this.collection = $data.getCategoryItems();
        },
        render: function() {

            $logging.d('Render MainView');
            this.$el.html(mustache.render(this.template));

            var thisView = this;

            this.collection.fetch({
                success: function(collection) {
                    // Add an extra category "Add new category"
                    // collection.add({addNew: true, image:'http://placehold.it/150x150'});

                    // Split categories to fit for slide pages, using Underscore - see http://underscorejs.org/#groupBy
                    // var pages = categories.groupBy(categories, function(item, index) {
                        // console.log(index);
                        // return Math.floor(index / 6);
                    // });
                    // console.log(pages);
                    // pages = _.toArray(pages);

                    // var that = this;
        //
                    // // Create a categories page for an orbit slide
                    // _.each(pages, function(page) {
                        // $logging.d(page);
                        // var categoriesSlide = new CategoriesSlide({model: page});
                        // that.$('.main-orbit').append(categoriesSlide.render().el);
                    // });

                    var categoriesSlide = new CategoriesSlide({collection: collection});
                    thisView.$el.append(categoriesSlide.render().el);
                }
            });
//
            return this;
        }
    });

    return MainView;
});
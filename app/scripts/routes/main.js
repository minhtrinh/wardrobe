/*global define*/

define([
    'jquery',
    'backbone',
    'data',
    'state',
    'views/main',
    'views/topbar',
    'views/imagesGallery'
], function ($, Backbone, $data, $state, MainView, Topbar, ImagesGallery) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'categories',
            'gallery/:id': 'gallery'
        },

        categories: function() {

            // set current page to state service
            $state.setCurrentPage('index');
            $state.setCurrentCategoryId(null);

            // Render top bar
            var topbar = new Topbar();
            $('.appBar').html(topbar.render().el);

            // Render main view
            var mainView = new MainView();
            $('.appContent').html(mainView.render().el);

        },
        gallery: function(id) {

            // set current page to state service
            $state.setCurrentPage('gallery');
            $state.setCurrentCategoryId(id);

            // Render top bar
            var topbar = new Topbar();
            $('.appBar').html(topbar.render().el);

            // Render images gallery of a category with images data
            $data.getImagesByCategory(id, function(images) {
                    var imagesGallery = new ImagesGallery({collection: images});
                    $('.appContent').html(imagesGallery.render().el);
                }
            );

        }

    });

    return MainRouter;
});
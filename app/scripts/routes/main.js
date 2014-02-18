/*global define*/

define([
    'jquery',
    'backbone',
    'data',
    'views/main',
    'views/topbar',
    'views/imagesGallery'
], function ($, Backbone, $data, MainView, Topbar, ImagesGallery) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'categories',
            'gallery/:id': 'gallery'
        },

        categories: function() {
            // Render top bar
            var topbar = new Topbar();
            $('.appBar').html(topbar.render().el);

            // Render main view
            var mainView = new MainView();
            $('.appContent').html(mainView.render().el);
        },
        gallery: function(id) {
            // Render top bar
            var topbar = new Topbar();
            $('.appBar').html(topbar.render().el);

            // Render images gallery of a category with images data
            var images = $data.getImagesByCategory(id);

            var imagesGallery = new ImagesGallery({collection: images});
            $('.appContent').html(imagesGallery.render().el);
        }

    });

    return MainRouter;
});
/*global define*/

define([
    'jquery',
    'backbone',
    'views/main',
    'views/topbar',
    'views/imagesGallery'
], function ($, Backbone, MainView, Topbar, ImagesGallery) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'categories',
            'gallery/:id': 'gallery'
        },

        categories: function() {
            // Render top bar
            var topbar = new Topbar();
            $('.appBar').empty().append(topbar.render().el);

            // Render main view
            var mainView = new MainView();
            $('.appContent').empty().append(mainView.render().el);
        },
        gallery: function(id) {
            // Render top bar
            var topbar = new Topbar();
            $('.appBar').empty().append(topbar.render().el);

            // Render images gallery of a category
            var imagesGallery = new ImagesGallery();
            $('.appContent').empty().append(imagesGallery.render().el);
        }

    });

    return MainRouter;
});
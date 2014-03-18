/*global define*/

define([
    'jquery',
    'backbone',
    'logging',
    'data',
    'state',
    'appView',
    'views/main',
    'views/topbar',
    'views/imagesGallery',
    'views/newestGallery',
    'views/details'
], function ($, Backbone, $logging, $data, $state, AppView, MainView, Topbar, ImagesGallery, NewestGallery, Details) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'categories',
            'gallery/:id': 'gallery',
            'newest': 'newest',
            'details/:id': 'details'
        },

        initialize: function() {
            // TODO: http://lostechies.com/derickbailey/2011/09/15/zombies-run-managing-page-transitions-in-backbone-apps/
        },

        categories: function() {

            // set current page to state service
            $state.setCurrentPage('index');
            $state.setCurrentCategoryId(null);

            // Render top bar
            var topbar = new Topbar({
                hasBackButton: false,
                hasRightButton: false,
                title: 'Wardrobe'
            });
            $('.appBar').html(topbar.render().el);

            // Render main view
            var mainView = new MainView();
            // $('.appContent').html(mainView.render().el);
            AppView.attachView($('.appContent'), mainView);
        },
        gallery: function(id) {

            // set current page to state service
            $state.setCurrentPage('gallery');
            $state.setCurrentCategoryId(id);

            // Render top bar
            var topbar = new Topbar({
                hasBackButton: true,
                hasRightButton: false,
                title: $state.getCurrentCategoryName()
            });
            $('.appBar').html(topbar.render().el);

            // Render images gallery of a category with images data
            $data.getImagesByCategory(id, function(images) {
                    var imagesGallery = new ImagesGallery({collection: images});
                    // $('.appContent').html(imagesGallery.render().el);
                    AppView.attachView($('.appContent'), imagesGallery);
                }
            );

        },

        newest: function() {

            // set current page to state service
            $state.setCurrentPage('newest');

            // Render top bar
            var topbar = new Topbar({
                hasBackButton: true,
                hasRightButton: false,
                title: 'Neuheiten'
            });
            $('.appBar').html(topbar.render().el);

            // Render images gallery of newest with images data (default: from last 7 days)
            $data.getLastestImages(7, function(images) {
                    var newestGallery = new NewestGallery({collection: images});
                    // $('.appContent').html(newestGallery.render().el);
                    AppView.attachView($('.appContent'), newestGallery);
                }
            );
        },

        details: function(id) {
            $logging.d('Router: Navigate to #details/' + id);

            // set current page to state service
            $state.setCurrentPage('details');
            $state.setCurrentImageId(id);

            // Render top bar
            var topbar = new Topbar({
                hasBackButton: true,
                hasRightButton: true,
                title: $state.getCurrentCategoryName()
            });
            $('.appBar').html(topbar.render().el);

            // Render images gallery of a category with images data
            $data.getImageById(id, function(image) {
                    var details = new Details({model: image});
                    // $('.appContent').html(details.render().el);
                    AppView.attachView($('.appContent'), details);
                }
            );
        }

    });

    return MainRouter;
});
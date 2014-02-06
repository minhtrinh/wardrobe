/*global define*/

define([
    'jquery',
    'backbone',
    'views/main',
    'views/topbar'
], function ($, Backbone, MainView, Topbar) {
    'use strict';

    var MainRouter = Backbone.Router.extend({
        routes: {
            '': 'categories'
        },

        categories: function() {
            // Render top bar
            var topbar = new Topbar();
            $('.appBar').empty().append(topbar.render().el);

            // Render main view
            var mainView = new MainView();
            $('.appContent').empty().append(mainView.render().el);
        }

    });

    return MainRouter;
});
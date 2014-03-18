/*global define*/

define('appView', [
    'jquery',
    'underscore',
    'backbone',
    'logging',
    'hammerjs',
    'jqHammer'
], function($, _, Backbone, $logging) {
    'use strict';

    var currentView;

    return {
        attachView: function(selector, view) {
            if (currentView) {
                currentView.close();
            }
            currentView = view;
            selector.html(view.render().el);

            currentView.$el.hammer();
        }
    };
});
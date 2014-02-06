/*global require*/
'use strict';

require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        foundation: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        underscore: '../bower_components/underscore/underscore',
        mustache: '../bower_components/mustache/mustache',

        // Services
        camera: '../scripts/services/camera',

        // Foundation
        foundation: '../bower_components/foundation/js/foundation.min'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'routes/main',
    'foundation'
], function ($, _, Backbone, Router) {

    //= require foundation
    $('body').foundation();

    new Router();
    Backbone.history.start();


});

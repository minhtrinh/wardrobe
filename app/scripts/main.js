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
        json: '../bower_components/requirejs-plugins/src/json',
        underscore: '../bower_components/underscore/underscore',
        mustache: '../bower_components/mustache/mustache',
        localStorage: '../bower_components/Backbone.localStorage/backbone.localStorage-min',

        // Services
        camera: '../scripts/services/camera',
        data: '../scripts/services/data',
        logging: '../scripts/services/logging',

        // Foundation
        foundation: '../bower_components/foundation/js/foundation.min'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'routes/main',
    'data',
    'foundation'
], function ($, _, Backbone, Router, $data) {

    $data.init();

    new Router();
    Backbone.history.start();

    //= require foundation
    $(document).foundation();
});

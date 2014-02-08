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
        fileSystem: '../scripts/services/fileSystem',

        // Foundation
        foundation: '../bower_components/foundation/js/foundation'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'routes/main',
    'data',
    'fileSystem',
    'foundation'
], function ($, _, Backbone, Router, $data, $fileSystem) {

    // Killing zombie views by transition
    Backbone.View.prototype.close = function(){
        this.remove();
        this.unbind();
    };

    var initPlugins = function() {
        $fileSystem.init();
    };
    $data.init();

    new Router();
    Backbone.history.start();

    //= require foundation
    $(document).foundation({
        orbit: {
            timer: false
        }
    });

    document.addEventListener('deviceready', initPlugins, false);

});

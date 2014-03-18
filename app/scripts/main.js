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
        },
        mobiscroll_core: {
            deps: ['jquery'],
            exports: 'mobiscroll'
        },
        mobiscroll_scroller: {
            deps: ['jquery']
        },
        mobiscroll_datetime: {
            deps: ['jquery']
        },
        mobiscroll_select: {
            deps: ['jquery']
        },
        mobiscroll_scroller_ios7: {
            deps: ['jquery']
        },
        mobiscroll_scroller_ios: {
            deps: ['jquery']
        }
    },
    paths: {
        jquery: '../bower_components/jquery/jquery',
        backbone: '../bower_components/backbone/backbone',
        // json: '../bower_components/requirejs-plugins/src/json',
        underscore: '../bower_components/underscore/underscore',
        mustache: '../bower_components/mustache/mustache',
        localStorage: '../bower_components/Backbone.localStorage/backbone.localStorage-min',
        hammerjs: '../bower_components/hammerjs/hammer',
        jqHammer: '../bower_components/jquery-hammerjs/jquery.hammer',
        fastclick: '../bower_components/fastclick/lib/fastclick',
        mobiscroll_core: '../bower_components/mobiscroll/js/mobiscroll.core',
        mobiscroll_scroller: '../bower_components/mobiscroll/js/mobiscroll.scroller',
        mobiscroll_datetime: '../bower_components/mobiscroll/js/mobiscroll.datetime',
        mobiscroll_select: '../bower_components/mobiscroll/js/mobiscroll.select',
        mobiscroll_list: '../bower_components/mobiscroll/js/mobiscroll.list',
        mobiscroll_scroller_android: '../bower_components/mobiscroll/js/mobiscroll.scroller.android',
        mobiscroll_scroller_android_ics: '../bower_components/mobiscroll/js/mobiscroll.scroller.android-ics',
        mobiscroll_scroller_ios: '../bower_components/mobiscroll/js/mobiscroll.scroller.ios',
        mobiscroll_scroller_ios7: '../bower_components/mobiscroll/js/mobiscroll.scroller.ios7',
        mobiscroll_scroller_wp: '../bower_components/mobiscroll/js/mobiscroll.scroller.wp',
        mobiscroll_scroller_jqm: '../bower_components/mobiscroll/js/mobiscroll.scroller.jqm',

        // Services
        camera: '../scripts/services/camera',
        data: '../scripts/services/data',
        logging: '../scripts/services/logging',
        fileSystem: '../scripts/services/fileSystem',
        state: '../scripts/services/state',
        appView: '../scripts/services/appView',
        notification: '../scripts/services/notification',
        eventBus: '../scripts/services/eventBus',

        // Foundation
        foundation: '../bower_components/foundation/js/foundation'
    }
});

require([
    'jquery',
    'underscore',
    'backbone',
    'fastclick',
    'routes/main',
    'data',
    'fileSystem',
    'foundation',
    'mobiscroll_core',
    'mobiscroll_scroller',
    'mobiscroll_datetime',
    'mobiscroll_select',
    // 'mobiscroll_scroller_android',
    // 'mobiscroll_scroller_android_ics',
    'mobiscroll_scroller_ios',
    'mobiscroll_scroller_ios7',
], function ($, _, Backbone, fastclick, Router, $data, $fileSystem) {

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

    // Fastclick
    new FastClick($('body')[0]);

    //= require foundation
    $('body').foundation({
        orbit: {
            timer: false
        }
    });

    document.addEventListener('deviceready', initPlugins, false);

});

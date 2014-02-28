/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'logging',
    'state',
    'templates',
    'mustache',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, $logging, $state, JST, mustache) {
    'use strict';

    var TopbarView = Backbone.View.extend({
        className: 'fixed',
        template: JST['topbar-template'],
        initialize: function(data) {
            this.data = data;
            this.$el.hammer();
        },
        events: {
            'tap .nav-left-button': function() {
                $logging.d('Topbar: Go back');
                window.history.back();
            }
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.data));
            return this;
        }
    });

    return TopbarView;
});
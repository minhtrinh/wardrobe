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
        template: JST['topbar-template'],
        initialize: function() {
            console.log($state.getCurrentPage());
            if ($state.getCurrentPage() !== 'index') {
                this.$('a.nav-left-button').show();
            } else {
                this.$('a.nav-left-button').hide();
            }
        },
        events: {
            'click .nav-left-button': function() {
                $logging.d('click on Back button');
                window.history.back();
            }
        },

        render: function() {
            this.$el.html(mustache.render(this.template));
            return this;
        }
    });

    return TopbarView;
});
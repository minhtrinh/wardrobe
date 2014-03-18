/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'logging',
    'state',
    'templates',
    'mustache',
    'eventBus',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, $logging, $state, JST, mustache, $eventBus) {
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
            },
            'tap .nav-right-button': function() {
                this.$('#finish-label').toggle();
                this.$('#edit-icon').toggle();

                $eventBus.trigger('topbar_right_button_clicked');
            }
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.data));
            return this;
        }
    });

    return TopbarView;
});
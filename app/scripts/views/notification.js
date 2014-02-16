/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging) {
    'use strict';

    var NotificationView = Backbone.View.extend({
        el: '#notification',
        template: JST['notification-template'],
        initialize: function() {
            this.$el.hammer();
            _.bindAll(this, 'render', 'show', 'hide', 'setTitle', 'setMessage', 'setLeftButton', 'setRightButton');

        },
        render: function() {
            this.$el.html(mustache.render(this.template));

            var thisView = this;

            $(document).on('closed', '[data-reveal]', function () {
                thisView.removeEvents();
            });
            return this;
        },
        /**
         * show the modal view
         */
        show: function() {
            this.$el.foundation('reveal', 'open');
        },
        /**
         * hide the modal view
         */
        hide: function() {
            this.$el.foundation('reveal', 'close');
        },
        /**
         * set the title
         */
        setTitle: function(title) {
            this.$('#title').html(title);
        },
        /**
         * set the message text
         */
        setMessage: function(msg) {
            this.$('#message').html(msg);
        },
        /**
         * define title and click handling for buttons
         */
        setLeftButton: function(title, onClick) {
            this.$('.left').html(title);
            this.$('.left').on('tap', onClick);
            this.leftButtonHandler = onClick;
        },
        setRightButton: function(title, onClick) {
            this.$('.right').html(title);
            this.$('.right').on('tap', onClick);
            this.rightButtonHandler = onClick;
        },
        removeEvents: function() {
            if (!_.isUndefined(this.leftButtonHandler)) {
                this.$('.left').off('tap', this.leftButtonHandler);
            }

            if (!_.isUndefined(this.rightButtonHandler)) {
                this.$('.right').off('tap', this.rightButtonHandler);
            }
        }
    });

    return NotificationView;
});
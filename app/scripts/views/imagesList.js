/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'data',
    'eventBus'
], function ($, _, Backbone, JST, mustache, $logging, $data, $eventBus) {
    'use strict';

    var ImageslistView = Backbone.View.extend({
        template: JST['imagesList-template'],
        initialize: function(options) {
            _.bindAll(this, 'render', 'onTapRelatingItem', 'onTapAddButton');
            this.imageModel = options.imageModel;
        },

        events: {

            // Press on an image
            'tap a.th.relating-item': 'onTapRelatingItem',

            // Press on add new relation
            'tap a.th.add-relation-button': 'onTapAddButton'
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            return this;
        },

        onTapRelatingItem: function(event) {
            var id = event.currentTarget.id;

            $logging.d('imagesList: Tap on relating item ' + id);

            this.$('.relation-check#' + id).toggle();
        },

        onTapAddButton: function(event) {
            $logging.d('imagesList: Add new relation');
        }
    });

    return ImageslistView;
});
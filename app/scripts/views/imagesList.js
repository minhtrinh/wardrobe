/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'data'
], function ($, _, Backbone, JST, mustache, $logging, $data) {
    'use strict';

    var ImageslistView = Backbone.View.extend({
        template: JST['imagesList-template'],
        initialize: function(data) {
            this.data = data;
        },

        events: {

            // Press on an image
            'tap a.th.relating-item': 'onTapRelatingItem'
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.data));
        },

        onTapRelatingItem: function(event) {
            var id = event.target.id;

            $logging.d('imagesList: Tap on relating item ' + id);


        }
    });

    return ImageslistView;
});
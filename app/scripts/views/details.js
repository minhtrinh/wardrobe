/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'data',
    'fileSystem',
    'hammerjs',
    'jqHammer',
    'mobiscroll'
], function ($, _, Backbone, JST, mustache, $logging, $data, $fileSystem) {
    'use strict';

    var DetailsView = Backbone.View.extend({
        template: JST['details-template'],

        initialize: function() {
            _.bindAll(this, 'render', 'onTapEditButton', 'onTapAddSuitable');
            this.$el.hammer();
        },

        events: {
            // Press on edit button
            'tap .button#edit-button': 'onTapEditButton',

            // Press on add new suitable article
            'tap .th#add-suitable-button': 'onTapAddSuitable'
        },

        render: function() {
            // TODO: TEST
            if (!_.isUndefined(this.model)) {
                this.$el.html(mustache.render(this.template, this.model.toJSON()));
            } else {
                this.$el.html(mustache.render(this.template));
            }

            console.log(this.$('#scroller').mobiscroll({ preset: 'date' }));

            // this.$('#scroller').mobiscroll().date({
                // theme: 'ios7',
                // display: 'bottom',
                // mode: 'scroller'
            // });
            // $('#show').click(function(){
                // $('#demo').mobiscroll('show');
                // return false;
            // });
            // $('#clear').click(function () {
                // $('#demo').val('');
                // return false;
            // });

            return this;
        },

        onTapEditButton: function(event) {
            $logging.d('details: Press on edit button');

            if (this.$('#image-container').hasClass('small-12')) {
                this.$('#image-container').removeClass('small-12').addClass('small-8');
            } else {
                this.$('#image-container').removeClass('small-8').addClass('small-12');
            }

            this.$('#settings-modul').toggle(500);
        },

        onTapAddSuitable: function(event) {
            $logging.d('details: Press on Add suitable article');

            this.$('#categories-list').show();
        }
    });

    return DetailsView;
});
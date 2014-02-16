/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'views/notification',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging, Notification) {
    'use strict';

    var CategoriespageView = Backbone.View.extend({
        template: JST['categoriesSlide-template'],
        initialize: function() {
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.$el.hammer();

            // Render modal view to #notification
            this.notification = new Notification();
            this.notification.render();
        },
        events: {
            'tap .new-category': function(event) {
                this.$('.edit-caption#new').show();
                this.$('.edit-caption#new').focus();
            },
            'keypress .edit-caption': function(event) {
                var id = event.target.id;

                var thisView = this;

                if (event.keyCode === 13) {
                    var value = event.target.value;
                    $(event.target).hide();
                    if (value) {
                        thisView.collection.createOrUpdateModel({
                            id: id ? id : null,
                            name: value,
                            image: '../images/munte.jpg'
                        });
                    }
                }
            },
            'hold .category-thumbnails': function(event) {
                var id = event.target.id;

                var thisView = this;

                this.notification.setTitle('Kategorie bearbeiten');
                this.notification.setLeftButton('Löschen', function() {
                    thisView.removeCategory(id);
                });
                this.notification.setRightButton('Bearbeiten', function() {
                    thisView.editCategory(id);
                });
                this.notification.show();
            },
            'blur .edit-caption': 'closeEditMode'
        },
        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            return this;
        },
        removeCategory: function(id) {
            this.collection.removeModelById(id);
            this.notification.hide();
        },
        editCategory: function(id) {
            this.$('.edit-caption#' + id).show();
            this.$('.edit-caption#' + id).focus();
            this.$('.category-caption#' + id).hide();
            this.notification.hide();
        },
        closeEditMode: function() {
            this.$('.edit-caption').hide();
            this.$('.category-caption').show();
        }
    });

    return CategoriespageView;
});
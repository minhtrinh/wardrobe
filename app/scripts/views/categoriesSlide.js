/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'notification',
    'hammerjs',
    'jqHammer'
], function ($, _, Backbone, JST, mustache, $logging, $notification) {
    'use strict';

    var CategoriespageView = Backbone.View.extend({
        template: JST['categoriesSlide-template'],
        initialize: function() {
            _.bindAll(this, 'render', 'onConfirm', 'removeCategory', 'editCategory', 'closeEditMode');
            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.$el.hammer();
            this.selectedCategory = null;
        },
        events: {

            // Click on "Add new category" button
            'tap .new-category': function(event) {
                this.$('.edit-caption#new').show();
                this.$('.edit-caption#new').focus();
            },

            // Handling for edit category's caption
            'keypress .edit-caption': function(event) {
                var id = event.target.id;
                var thisView = this;

                // Finish after click on Enter
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

            // Handling when user press and hold on a category
            'hold .category-thumbnails': function(event) {
                var id = event.target.id;
                this.selectedCategory = id;

                $notification.confirm(
                    this.collection.get(id).get('name'),
                    this.onConfirm,
                    'Kategorie bearbeiten',
                    ['Löschen','Bearbeiten','Abbrechen']
                );
            },

            // Edit caption losts focus
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
        },
        onConfirm: function(buttonId) {
            switch(buttonId) {
                case 1: // Delete
                this.removeCategory(this.selectedCategory);
                break;
                case 2: // Edit
                this.editCategory(this.selectedCategory);
                break;
                default: // Cancel
                break;
            }

            this.selectedCategory = null;
        }
    });

    return CategoriespageView;
});
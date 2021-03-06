/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'data',
    'notification'
], function ($, _, Backbone, JST, mustache, $logging, $data, $notification) {
    'use strict';

    var CategoriespageView = Backbone.View.extend({
        template: JST['categoriesSlide-template'],

        initialize: function() {
            _.bindAll(this, 'render', 'onConfirm', 'removeCategory',
                'editCategory', 'closeEditMode', 'onTapAddCategory',
                'onEditCaption', 'onHoldCategory', 'nameIsValid');

            this.listenTo(this.collection, 'add', this.render);
            this.listenTo(this.collection, 'remove', this.render);
            this.listenTo(this.collection, 'change', this.render);
            this.selectedCategory = null;
        },

        events: {

            // Press on category
            'tap .category-thumbnails': 'onTapCategory',

            // Press on newest
            'tap .newest': 'onTapNewest',

            // Press on "Add new category" button
            'tap .add-category': 'onTapAddCategory',

            // Handling for edit category's caption
            'keypress .edit-caption': 'onEditCaption',

            // Handling when user press and hold on a category
            'hold .category-thumbnails': 'onHoldCategory',

            // Edit caption losts focus
            'blur .edit-caption': 'closeEditMode'
        },

        onTapCategory: function(event) {
            var id = event.target.id;

            $logging.d('categoriesSlide: Tap on category: ' + id);

            Backbone.history.navigate('gallery/' + id, {trigger: true});
        },

        onTapNewest: function(event) {
            $logging.d('categoriesSlide: Tap on newest');

            Backbone.history.navigate('newest', {trigger: true});
        },

        onTapAddCategory: function(event) {
            $logging.d('categoriesSlide: Tap on Add new category.');

            this.$('.edit-caption#new').show();
            this.$('.edit-caption#new').focus();
        },

        onEditCaption: function(event) {
            var id = event.target.id;

            $logging.d('categoriesSlide: Edit caption: ' + id);

            var thisView = this;

            // Finish after click on Enter
            if (event.keyCode === 13) {
                var value = event.target.value.trim();
                $(event.target).hide();
                if (value && thisView.nameIsValid(value)) {
                    thisView.collection.createOrUpdateModel({
                        id: id ? id : null,
                        name: value
                    });
                }
            }
        },

        nameIsValid: function(value) {
            return !_.contains(this.collection.pluck('name'), value);
        },

        onHoldCategory: function(event) {
            var id = event.target.id;

            $logging.d('categoriesSlide: Hold on category: ' + id);

            this.selectedCategory = id;

            $notification.confirm(
                this.collection.get(id).get('name'),
                this.onConfirm,
                'Kategorie bearbeiten',
                ['Löschen','Bearbeiten','Abbrechen']
            );
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));
            var thisView = this;

            $data.getNewestImage(function(newestImage) {
                if (!_.isUndefined(newestImage) && !_.isNull(newestImage)) {
                    thisView.$('.newest').attr('src', newestImage.get('path'));
                }
            });
            return thisView;
        },

        removeCategory: function(id) {
            $logging.d('categoriesSlide: Remove category: ' + id);

            this.collection.removeModelById(id);
            this.notification.hide();
        },

        editCategory: function(id) {
            $logging.d('categoriesSlide: Edit category: ' + id);

            this.$('.edit-caption#' + id).show();
            this.$('.edit-caption#' + id).focus();
            this.$('.category-caption#' + id).hide();
            this.notification.hide();
        },

        closeEditMode: function() {
            $logging.d('categoriesSlide: Close edit mode');

            this.$('.edit-caption').hide();
            this.$('.category-caption').show();
        },

        onConfirm: function(buttonId) {
            $logging.d('categoriesSlide: Confirm ' + buttonId);

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
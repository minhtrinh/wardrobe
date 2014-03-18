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
    'state',
    'notification',
    'eventBus',
    'views/categoriesSelect',
    'views/dateSelect',
    'views/imagesList'
], function ($, _, Backbone, JST, mustache, $logging, $data, $fileSystem, $state, $notification,
            $eventBus, CategoriesSelect, DateSelect, ImagesList) {
    'use strict';

    var DetailsView = Backbone.View.extend({
        template: JST['details-template'],

        initialize: function() {
            _.bindAll(this, 'render', 'onCategorySelected', 'updateCategoryThumbs',
                'onTimeSelected', 'onEdit', 'onRemove', 'onConfirm');

            this.categoryId = $state.getCurrentCategoryId();

            var thisView = this;

            $data.getCategoryItems().fetch({
                success: function(categories) {
                    thisView.categoriesSelect = new CategoriesSelect({
                        name: 'image_category',
                        imageModel: thisView.model,
                        collection: categories
                    });

                }
            });

            this.dateSelect = new DateSelect({
                name: 'image_time',
                imageModel: thisView.model
            });

            $data.getImageItems().fetch({
                success: function(images) {
                    thisView.imagesList = new ImagesList({
                        imageModel: thisView.model,
                        collection: images
                    });
                }
            });

            // Bind global events for mobiscroll to this view
            $eventBus.bind('categories_scroller_selected', this.onCategorySelected);
            $eventBus.bind('time_scroller_selected', this.onTimeSelected);
            $eventBus.bind('topbar_right_button_clicked', this.onEdit);
        },

        events: {
            // Press on edit button
            'tap .button#edit-button': 'onTapEditButton',

            // Press on remove button
            'tap .button#remove-button': 'onRemove',

            // Press on Add relation button
            'tap .button#add-relation-button': 'onBeginAddRelation'
        },

        render: function() {
            // TODO: TEST
            if (!_.isUndefined(this.model)) {
                this.$el.html(mustache.render(this.template, this.model.toJSON()));
            } else {
                this.$el.html(mustache.render(this.template));
            }

            // Add categories select element into settings modul
            this.$('#categories-select').append(this.categoriesSelect.render().el);

            // Add date select element into settings modul
            this.$('#date-select').append(this.dateSelect.render().el);

            // Add categories select for relations
            // this.$('#relation-categories-select').append(this.relationCategoriesSelect.render().el);

            // Render the image list
            this.$('#relating-images').append(this.imagesList.render().el);

            return this;
        },

        onEdit: function(args) {
            $logging.d('details: Press on edit button');

            if (this.$('#image-container').hasClass('small-12')) {
                this.$('#image-container').removeClass('small-12').addClass('small-8');
            } else {
                this.$('#image-container').removeClass('small-8').addClass('small-12');
            }

            this.$('#settings-modul').toggle(500);
        },

        onRemove: function() {
            $notification.confirm(
                'Wirklich löschen?',
                this.onConfirm,
                'Foto löschen',
                ['OK','Abbrechen']
            );
        },

        onConfirm: function(buttonId) {
            var thisView = this;

            if (buttonId === 1) {
                this.model.destroy({
                    success: function() {
                        window.history.back();
                        thisView.updateCategoryThumbs();
                    }
                });
            }
        },

        onBeginAddRelation: function() {
            $logging.d('details: Tap on add relation');

            this.$('#relation-categories-select').toggle(500);
        },

        onCategorySelected: function(args) {
            $logging.d('details: Selected from ' + args.from + ', value: ' + args.value);

            var thisView = this;

            if (args.from === 'image_category') {
                thisView.model.save({category: args.value});
            }
        },

        onTimeSelected: function(args) {
            $logging.d('details: Selected from ' + args.from + ', value: ' + args.value);

            var thisView = this;

            if (args.from === 'image_time') {
                this.model.save({time: args.value}, {
                    success: function() {
                        thisView.updateCategoryThumbs();
                    }
                });
            }
        },

        updateCategoryThumbs: function() {
            $data.updateCategoryThumbnail(this.model.get('category'));
        },

        close: function() {
            $eventBus.unbind('categories_scroller_selected', this.onCategorySelected);
            $eventBus.unbind('time_scroller_selected', this.onTimeSelected);
            $eventBus.unbind('topbar_right_button_clicked', this.onEdit);

            this.categoriesSelect.close();
            this.dateSelect.close();
            this.imagesList.close();
        }
    });

    return DetailsView;
});
/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'eventBus'
], function ($, _, Backbone, JST, mustache, $logging, $eventBus) {
    'use strict';

    var CategoriesSelectView = Backbone.View.extend({
        template: JST['categoriesSelect-template'],

        initialize: function(options) {
            _.bindAll(this, 'render', 'show');
            this.name = options.name;
            this.imageModel = options.imageModel;
        },

        render: function() {
            this.$el.html(mustache.render(this.template, this.collection.toJSON()));

            var thisView = this;

            this.$('#scroller').mobiscroll('setValue', ['Tops']).select({
                theme: 'ios7',
                display: 'bottom',
                mode: 'scroller',
                animate: 'slidevertical',
                headerText: 'Kategories auswählen',
                minWidth: 200,
                onSelect: function(valueText, inst) {
                    $logging.d('categoriesSelect: Selected: ' + valueText);
                    $eventBus.trigger('categories_scroller_selected', {
                        from: thisView.name,
                        value: inst.getValue()[0]
                    });
                },
                onBeforeShow: function(inst) {
                    // $logging.d('categoriesSelect: Set value');
                    // inst.setValue([thisView.imageModel.get('category')]);
                }
            });

            return this;
        },

        show: function() {
            this.$('#scroller').mobiscroll('show');
        }
    });

    return CategoriesSelectView;
});
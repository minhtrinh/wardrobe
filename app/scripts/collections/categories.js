/*global define*/

define([
    'underscore',
    'backbone',
    'models/category',
    'localStorage'
], function (_, Backbone, CategoryModel) {
    'use strict';

    var CategoriesCollection = Backbone.Collection.extend({
        model: CategoryModel,
        localStorage: new Backbone.LocalStorage('categories'),
        removeModelById: function(id) {
            this.get(id).destroy();
        },
        createOrUpdateModel: function(data) {
            if (!_.isNull(data.id) && !_.isUndefined(this.get(data.id))) {
                this.get(data.id).save(data);
            } else {
                if (this.length > 0) {
                    data.id = (parseInt(this.last().get('id')) + 1).toString();
                } else {
                    data.id = '1';
                }
                this.create(data);
            }
        }
    });

    return CategoriesCollection;
});
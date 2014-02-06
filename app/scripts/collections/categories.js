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
        // url: '../configuration/categories.json',
        localStorage: new Backbone.LocalStorage('categories')
    });

    return CategoriesCollection;
});
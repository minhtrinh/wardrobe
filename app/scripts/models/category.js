/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var CategoryModel = Backbone.Model.extend({
        defaults: {
            image: 'images/munte.jpg'
        }
    });

    return CategoryModel;
});
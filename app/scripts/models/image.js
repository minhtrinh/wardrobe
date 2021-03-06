/*global define*/

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var ImageModel = Backbone.Model.extend({
        defaults: {
            relate: []
        },
        setImage: function(path) {
            this.set('image', path);
        }
    });

    return ImageModel;
});
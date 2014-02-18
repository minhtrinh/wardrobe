/*global define*/

define([
    'underscore',
    'backbone',
    'models/image',
    'localStorage'
], function (_, Backbone, ImagesModel) {
    'use strict';

    var ImagesCollection = Backbone.Collection.extend({
        model: ImagesModel,
        localStorage: new Backbone.LocalStorage('images'),
        removeModelById: function(id) {
            this.get(id).destroy();
        },
        createOrUpdateModel: function(data) {
            if (!_.isNull(data.id) && !_.isUndefined(this.get(data.id))) {
                this.get(data.id).save(data);
            } else {
                data.id = (parseInt(this.last().get('id')) + 1).toString();
                this.create(data);
            }
        }
    });

    return ImagesCollection;
});
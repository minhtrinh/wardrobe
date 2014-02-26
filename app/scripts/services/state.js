/*global define*/

define('state', [
    'backbone',
    'logging',
    'data'
], function(Backbone, $logging, $data) {
    'use strict';

    /**
     *  This service will be used to handle state of the app.
     */
    var currentPage,
        currentCategoryId,
        currentImageId;

    /**
     * Public APIs
     */
    return {
        getCurrentPage: function() {
            return currentPage;
        },

        setCurrentPage: function(page) {
            currentPage = page;
        },

        getCurrentCategoryId: function() {
            return currentCategoryId;
        },

        setCurrentCategoryId: function(id) {
            currentCategoryId = id;
        },

        getCurrentCategoryName: function() {
            if (!_.isUndefined(currentCategoryId) && !_.isNull(currentCategoryId)) {
                var currentCategory = $data.getCategoryItems().get(currentCategoryId);
                $logging.d(currentCategory.get('name'));
                return currentCategory.get('name');
            }
            return 'Wardrobe';
        },

        setCurrentImageId: function(id) {
            currentImageId = id;
        },

        getCurrentImageId: function() {
            return currentImageId;
        }
    };
});
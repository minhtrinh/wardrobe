/*global define*/

define('state', [
    'backbone',
    'logging'
], function(Backbone, $logging) {
    'use strict';

    /**
     *  This service will be used to handle state of the app.
     */
    var currentPage,
        currentCategoryId;

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
        }
    };
});
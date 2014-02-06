/*global define*/

define('categories', [
    'data'
], function($data) {
    'use strict';

    /**
     * Public APIs
     */
    return {
        getAllCategories: function() {
            return $data.getCategoriesItems();
        }
    };
});
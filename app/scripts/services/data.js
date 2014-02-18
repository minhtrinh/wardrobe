/*global define*/

define('data', [
    'logging',
    'models/category',
    'collections/categories',
    'models/image',
    'collections/images'
], function($logging, Category, Categories, Image, Images) {
    'use strict';

    /**
     *  This service will be used to handle persistent data.
     *  Another moduls will take category, image data from here.
     */

    var categories,
        images;

    /**
     * Public APIs
     */
    return {
        init: function() {
            $logging.d('Init data');

            // Get categories from localStorage, create default categories if no categories exist
            categories = new Categories();
            categories.fetch({
                success: function(result) {
                    if (categories.length === 0) {

                        categories.create(new Category({id: '1',  name: 'Neuheiten', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '2',  name: 'Wünsche Korb', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '3',  name: 'Tops', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '4',  name: 'Hemden/Blusen', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '5',  name: 'Cadigans/Pullover', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '6',  name: 'Jäcke/Blazer/Mätel', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '7',  name: 'Kleider', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '8',  name: 'Röcke', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '9',  name: 'Hosen/Jeans', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '10', name: 'Wäsche/Strümpfe', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '11', name: 'Accessories', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '12', name: 'Schuhe', image: '../images/munte.jpg'}));
                    }
                }
            });

            // Get images from localStorage
            images = new Images();
            images.fetch({
                success: function(result) {
                    if (images.length === 0) {

                        images.create(new Image({id: '1', path: '../images/munte.jpg', category: '1'}));
                        images.create(new Image({id: '2', path: '../images/munte.jpg', category: '2'}));
                        images.create(new Image({id: '3', path: '../images/munte.jpg', category: '3'}));
                        images.create(new Image({id: '4', path: '../images/munte.jpg', category: '4'}));
                        images.create(new Image({id: '5', path: '../images/munte.jpg', category: '5'}));
                        images.create(new Image({id: '6', path: '../images/munte.jpg', category: '6'}));
                        images.create(new Image({id: '7', path: '../images/munte.jpg', category: '7'}));
                        images.create(new Image({id: '8', path: '../images/munte.jpg', category: '8'}));
                        images.create(new Image({id: '9', path: '../images/munte.jpg', category: '9'}));
                        images.create(new Image({id: '10', path: '../images/munte.jpg', category: '10'}));
                        images.create(new Image({id: '11', path: '../images/munte.jpg', category: '11'}));
                        images.create(new Image({id: '12', path: '../images/munte.jpg', category: '12'}));
                    }
                }
            });

        },

        /**
         * get categories collection
         */
        getCategoryItems: function() {
            return categories;
        },

        /**
         * get images collection
         */
        getImageItems: function() {
            return images;
        },

        /**
         * get all images of a category
         * @param {Object} category-id
         */
        getImagesByCategory: function(id) {
            return new Images(images.where({category: id}));
        }
    };
});
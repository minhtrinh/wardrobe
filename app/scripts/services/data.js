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

    var categories, images;

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

                        categories.create(new Category({id: '1',  name: 'Wünsche Korb', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '2',  name: 'Tops', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '3',  name: 'Hemden/Blusen', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '4',  name: 'Cadigans/Pullover', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '5',  name: 'Jäcke/Blazer/Mätel', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '6',  name: 'Kleider', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '7',  name: 'Röcke', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '8',  name: 'Hosen/Jeans', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '9', name: 'Wäsche/Strümpfe', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '10', name: 'Accessories', image: '../images/munte.jpg'}));
                        categories.create(new Category({id: '11', name: 'Schuhe', image: '../images/munte.jpg'}));
                    }
                }
            });

            // Get images from localStorage
            images = new Images();
            images.fetch();

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
         * get all images of a given category and pass them to callback function
         * @param {String} category-id
         * @param {Function} callback with parameter: Images-Collection
         */
        getImagesByCategory: function(id, callback) {
            $logging.d('Data: getImagesByCategory: ' + id);

            images.fetch({
                success: function() {
                    var list = images.where({category: id});
                    callback(new Images(list));
                }
            });
        },

        /**
         * get image with id
         * @param {String} image-id
         * @param {Function} callback with parameter: Image-Model
         */
        getImageById: function(id, callback) {
            images.fetch({
                success: function() {
                    callback(images.get(id));
                }
            });
        },

        /**
         * get the newest image and pass it to callback function
         * @param {Function} callback with parameter: Image-Model
         */
        getNewestImage: function(callback) {
            images.fetch({
                success: function() {
                    var newestImage;

                    if (images.length > 0) {
                        newestImage = images.max(function(image) {
                            return image.get('time');
                        });
                    }
                    callback(newestImage);
                }
            });
        },

        /**
         * get the newest image of a category and pass it to callback function
         * @param {String} category-id
         * @param {Function} callback
         */
        getNewestImageByCategory: function(id, callback) {
            images.fetch({
                success: function() {
                    var all = images.where({category: id}),
                        newestImage;

                    if (all.length > 0) {
                        newestImage = _.max(all, function(image) {
                            return image.get('time');
                        });
                    }
                    callback(newestImage);
                }
            });
        },

        /**
         * get the images that were created since x day and pass them to callback function
         * @param {Number} days
         * @param {Function} callback with parameter: Images-Collection
         */
        getLastestImages: function(days, callback) {
            images.fetch({
                success: function() {
                    var list;
                    var now = new Date();
                    var beginTime = now.getTime() - days * 24 * 3600 * 1000;

                    if (images.length > 0) {
                        list = images.filter(function(image) {
                            return image.get('time') >= beginTime;
                        });
                    }
                    callback(new Images(list));
                }
            });
        }
    };
});
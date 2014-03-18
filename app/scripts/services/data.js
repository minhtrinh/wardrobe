/*global define*/

define('data', [
    'logging',
    'fileSystem',
    'models/category',
    'collections/categories',
    'models/image',
    'collections/images'
], function($logging, $fileSystem, Category, Categories, Image, Images) {
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
         * get category with unique name and pass it to callback function
         *
         * @param {Object} name
         * @param {Object} callback
         */
        getCategoryByName: function(name, callback) {
            categories.fetch({
                success: function() {
                    callback(categories.findWhere({name: name}));
                }
            });
        },

        /**
         * get images collection
         */
        getImageItems: function() {
            return images;
        },

        /**
         * get all images of a given category and pass them to callback function
         *
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
         * get the newest image of a category and pass it to callback function
         * They are the content of "Newest" category
         *
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
         * after creating or deleting an image, use this API to update the category's thumbnail
         *
         * @param {String} category-id
         * @param {Function} callback
         */
        updateCategoryThumbnail: function(id, callback) {
            $logging.d('Data: update category thumbnail ' + id);
            this.getNewestImageByCategory(id, function(item) {
                categories.get(id).set('image', item.get('path')).save({
                    success: function() {
                        $logging.d('Data: update category thumbnail OK: ' + item.get('path'));
                    }
                });
            });
        },

        /**
         * get image with id
         *
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
         * This is used to display thumbnail of "Newest" category
         *
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
        },

        /**
         * get list of paths to relating images of an image
         *
         * @param {Object} id
         * @param {Object} callback
         */
        getRelatingImages: function(id, callback) {
            images.fetch({
                success: function() {
                    var list = [];
                    _.each(images.get(id).get('relate'), function(relate) {
                        list.push(images.get(relate));
                    });

                    callback(new Images(list));
                }
            });
        },

        /**
         * create relation to 2 images with the given ids
         *
         * @param {Object} id1
         * @param {Object} id2
         */
        createRelation: function(id1, id2) {
            images.fetch({
                success: function() {
                    var image1 = images.get(id1);
                    var image2 = images.get(id2);

                    if (!_.contains(image1.get('relate'), id2)) {
                        image1.get('relate').push(id2).save();
                    }

                    if (!_.contains(image2.get('relate'), id1)) {
                        image2.get('relate').push(id1).save();
                    }
                }
            });
        },

        /**
         * remove the relation of 2 given images
         *
         * @param {Object} id1
         * @param {Object} id2
         */
        removeRelation: function(id1, id2) {
            images.fetch({
                success: function() {
                    var image1 = images.get(id1);
                    var image2 = images.get(id2);

                    image1.set('relate', _without(image1.get('relate'), id2));
                    image2.set('relate', _without(image2.get('relate'), id1));

                    image1.save();
                    image2.save();
                }
            });
        },

        /**
         * complete remove an image (from localStorage and from fileSystem)
         *
         * @param {Object} id
         * @param {Object} callback
         */
        removeImage: function(id, callback) {
            $logging.d('Data: Remove image ' + id);

            $fileSystem.remove(images.get(id).get('path'), function() {
                images.removeModelById(id);
                callback();
            });
        }

    };
});
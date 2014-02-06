/*global define*/

define('data', [
    'logging',
    'models/category',
    'collections/categories'
], function($logging, Category, Categories) {
    'use strict';

    var categories;

    /**
     * Public APIs
     */
    return {
        init: function() {
            $logging.d('Init data');
            categories = new Categories();
            categories.fetch({
                success: function(result) {
                    if (categories.models.length === 0) {

                        categories.create(new Category({name: 'Neuheiten', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Wünsche Korb', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Tops', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Hemden/Blusen', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Cadigans/Pullover', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Jäcke/Blazer/Mätel', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Kleider', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Röcke', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Hosen/Jeans', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Wäsche/Strümpfe', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Accessories', image: '../images/munte.jpg'}));
                        categories.create(new Category({name: 'Schuhe', image: '../images/munte.jpg'}));
                    }
                }
            });


            $logging.d(categories);
        },
        getCategoryItems: function() {
            $logging.d(categories);
            return categories;
        }
    };
});
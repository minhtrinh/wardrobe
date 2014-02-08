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

            // Get categories from localStorage
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

        },
        getCategoryItems: function() {
            return categories;
        }
    };
});
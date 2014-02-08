/*global define*/

define('logging', [
], function() {
    'use strict';

    var DEVELOPMENT = true;

    /**
     * Public APIs
     */
    return {
        // debug
        d: function(msg) {
            if (DEVELOPMENT) {
                console.log('[DEBUG]   ' + JSON.stringify(msg));
            }
        },
        // info
        i: function(msg) {
            console.log('[INFO]   ' + JSON.stringify(msg));
        },
        // verbose
        v: function(msg) {
            if (DEVELOPMENT) {
                console.log('[VERBOSE]   ' + JSON.stringify(msg));
            }
        }
    };
});
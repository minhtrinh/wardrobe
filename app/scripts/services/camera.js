/*global define, navigator*/

define('camera', [
], function() {
    'use strict';

    /**
     * Public APIs
     */
    return {
        /**
         * Capture photo using Cordova Camera plugin
         * @param {Object} onSuccess
         * @param {Object} onFail
         */
        capturePhoto : function(onSuccess, onFail) {

            // check if cordova and camera plugin was loaded
            if (!_.isUndefined(navigator) && !_.isUndefined(navigator.camera)) {

                // Take picture using device camera and retrieve image as base64-encoded string
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality : 50,
                    destinationType : destinationType.DATA_URL
                });
            } else {
                onFail('Cordova Camera wasn\'t loaded');
            }
        }
    };
});
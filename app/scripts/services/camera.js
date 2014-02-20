/*global define, navigator*/

define('camera', [
    'logging'
], function($logging) {
    'use strict';

    var onFail = function(msg) {
        $logging.d('Camera failed, because: ' + JSON.stringify(msg));
    };

    /**
     * Public APIs
     */
    return {
        /**
         * Capture photo using Cordova Camera plugin
         * @param {Object} onSuccess
         * @param {Object} onFail
         */
        capturePhoto : function(onSuccess) {

            // check if cordova and camera plugin was loaded
            if (!_.isUndefined(navigator) && !_.isUndefined(Camera)) {

                // Take picture using device camera and retrieve image as base64-encoded string
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    allowEdit: true,
                    destinationType: Camera.DestinationType.FILE_URI
                });
            } else {
                onFail('Cordova Camera wasn\'t loaded');
            }
        },

        getFromLibrary: function(onSuccess) {

            // check if cordova and camera plugin was loaded
            if (!_.isUndefined(navigator) && !_.isUndefined(Camera)) {

                // Take picture from photo library
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    destinationType: Camera.DestinationType.FILE_URI
                });
            } else {
                onFail('Cordova Camera wasn\'t loaded');
            }
        },

        getFromPhotoAlbum: function(onSuccess) {

            // check if cordova and camera plugin was loaded
            if (!_.isUndefined(navigator) && !_.isUndefined(Camera)) {

                // Take picture from saved photo album
                navigator.camera.getPicture(onSuccess, onFail, {
                    quality: 50,
                    sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
                    destinationType: Camera.DestinationType.FILE_URI
                });
            } else {
                onFail('Cordova Camera wasn\'t loaded');
            }
        }

    };
});
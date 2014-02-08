/*global define*/

define('fileSystem', [
    'logging'
], function($logging) {
    'use strict';

    var fileSystem,

        onFail = function(error) {
            $logging.d('fileSystem fail: ' + error);
        };
    /**
     * Public APIs
     */
    return {
        init: function() {
            $logging.d('Init Filesystem');

            // check if Cordova and FileSystem plugin are loaded
            if (!_.isUndefined(requestFileSystem) && !_.isUndefined(LocalFileSystem)) {
                requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
                    fileSystem = fs;
                }, onFail);
            }
        },

        getImagesInDir: function(dir, onSuccess, onError) {
            var paths = [];

            // NOTE: Test
            if (!_.isUndefined(fileSystem)) {
                fileSystem.root.getDirectory('Download', {create: false},
                function(imgDir) {
                    var reader = imgDir.createReader();
                    reader.readEntries(function(entries) {

                        // Find all jpg images in directory, add paths to list
                        _.each(entries, function(entry) {
                            if (entry.name.indexOf(".jpg") != -1) {
                                $logging.d(entry.fullPath);
                                paths.push(entry.fullPath);
                            }
                        });

                        // Callback on success
                        onSuccess(paths);
                    }, onFail);
                }, onFail);
            } else {

                // Add mock picture
                paths.push('../images/munte.jpg');
                paths.push('../images/munte.jpg');
                onSuccess(paths);
            }
            // End Test
        }
    };
});
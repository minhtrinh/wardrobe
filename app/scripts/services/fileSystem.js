/*global define*/

define('fileSystem', [
    'logging'
], function($logging) {
    'use strict';

    var fileSystem,
        appDirectory,
        utils = {

            onFail: function(msg) {
                $logging.d('fileSystem fail: ' + msg);
            }
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

                    // create new folder names "Wardrobe" if not exists
                    fileSystem.root.getDirectory('Wardrobe', {create: true, exclusive: false},
                    function(appDir) {
                        appDirectory = appDir;
                    }, utils.onFail);
                }, utils.onFail);
            }
        },

        getImagesInDir: function(dir, onSuccess) {
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
                    }, utils.onFail);
                }, utils.onFail);
            } else {
                utils.onFail('Cordova Filesystem wasn\'t loaded');
            }
            // End Test
        },

        saveImage: function(data) {
            if (!_.isUndefined(resolveLocalFileSystemURI)
                && !_.isUndefined(fileSystem)
                && !_.isUndefined(appDirectory)) {

                resolveLocalFileSystemURI(data.imageData,
                    // callback function when the file system uri has been resolved
                    function(entry) {
                        var d = new Date();
                        var n = d.getTime();

                        // new file name
                        var newFileName = data.category + n + '.jpg';

                        entry.moveTo()
                    },
                    onFail);
            }
        }
    };
});
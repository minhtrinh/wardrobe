/*global define*/

define('fileSystem', [
    'logging'
], function($logging) {
    'use strict';

    var fileSystem,
        appDirectory,
        utils = {

            onFail: function(msg) {
                var err = '';
                if (_.isUndefined(FileError)) {
                    err = 'Cordova failed';
                } else {
                    switch(msg.code) {
                        case FileError.NOT_FOUND_ERR:
                        err = 'not found';
                        break;
                        case FileError.SECURITY_ERR:
                        err = 'security';
                        break;
                        case FileError.ABORT_ERR:
                        err = 'abort';
                        break;
                        case FileError.NOT_READABLE_ERR:
                        err = 'not readable';
                        break;
                        case FileError.ENCODING_ERR:
                        err = 'encoding';
                        break;
                        case FileError.NO_MODIFICATION_ALLOWED_ERR:
                        err = 'no modification allowed';
                        break;
                        case FileError.INVALID_STATE_ERR:
                        err = 'invalid state';
                        break;
                        case FileError.SYNTAX_ERR:
                        err = 'syntax';
                        break;
                        case FileError.INVALID_MODIFICATION_ERR:
                        err = 'invalid modification';
                        break;
                        case FileError.QUOTA_EXCEEDED_ERR:
                        err = 'quote exceed';
                        break;
                        case FileError.TYPE_MISMATCH_ERR:
                        err = 'type mismatch';
                        break;
                        case FileError.PATH_EXISTS_ERR:
                        err = 'path exists';
                        break;
                        default:
                        err = 'unknow';
                        break;
                    }
                }
                $logging.d('FileSystem fail, because: ' + err);
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

        getAllImages: function(onSuccess) {
            var paths = [];

            // NOTE: Test
            if (!_.isUndefined(fileSystem)) {
                fileSystem.root.getDirectory('Wardrobe', {create: false},
                function(imgDir) {
                    var reader = imgDir.createReader();
                    reader.readEntries(function(entries) {

                        $logging.d('fileSystem: getAllImages: Size ' + entries.length);

                        // Find all jpg images in directory, add paths to list
                        _.each(entries, function(entry) {
                            if (entry.name.indexOf(".jpg") != -1) {

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

        /**
         * persists the image in device, fires callback with the new image's path
         * @param {Object} data: contains category-id, image's data (64bit-info),
         *          callback function with file's path as parameter
         *          For example: data = { imageData: <image-data>,
         *                                categoryId: <category-id>,
         *                                callback: function(path) {
         *                                    <call-back>
         *                                }
         *                              }
         */
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
                        var newFileName = n + '.jpg';

                        entry.moveTo(appDirectory, newFileName,
                            function(entry) {
                                data.callback(entry.fullPath);
                            },
                            utils.onFail
                        );
                    },
                    utils.onFail
                );
            }
        },
        remove: function(path, callback) {
            if (!_.isUndefined(resolveLocalFileSystemURI)
                && !_.isUndefined(fileSystem)) {

                resolveLocalFileSystemURI('file://' + path,

                    // callback function when the file system uri has been resolved
                    function(entry) {
                        entry.remove(function(e) {
                            $logging.d('fileSystem: Removed ' + JSON.stringify(e));
                            callback(e.fullPath);
                        },
                        utils.onFail);
                    },
                    utils.onFail
                );
            }

        }
    };
});
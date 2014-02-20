/*global define*/

define('notification', [
], function() {
    'use strict';

    /**
     * Public APIs
     */
    return {
        confirm: function(message, callback, title, buttons) {
            if (!_.isUndefined(navigator.notification)) {
                navigator.notification.confirm(message, callback, title, buttons);
            } else {

                // Error handling
                callback('Cordova Notification wasn\'t loaded');
            }
        },
        alert: function(message, callback, title, button) {
            if (!_.isUndefined(navigator.notification)) {
                navigator.notification.alert(message, callback, title, button);
            } else {

                // Error handling
                callback('Cordova Notification wasn\'t loaded');
            }
        }
    };
});
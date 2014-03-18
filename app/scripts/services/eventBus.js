/*global define*/

define('eventBus', [
    'underscore',
    'backbone'
], function(_, Backbone) {
    'use strict';

    /**
     * Public APIs
     */
    return _.extend({}, Backbone.Events);
});
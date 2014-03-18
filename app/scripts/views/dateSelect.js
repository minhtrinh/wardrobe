/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'templates',
    'mustache',
    'logging',
    'eventBus'
], function ($, _, Backbone, JST, mustache, $logging, $eventBus) {
    'use strict';

    var DateselectView = Backbone.View.extend({
        template: JST['dateSelect-template'],

        initialize: function(options) {
            this.name = options.name;
            this.imageModel = options.imageModel;
        },

        render: function() {
            this.$el.html(mustache.render(this.template));

            var thisView = this;

            this.$('#date-scroller').mobiscroll('setValue', [new Date(thisView.imageModel.get('time'))]).date({
                theme: 'ios7',
                display: 'bottom',
                animate: 'slideup',
                mode: 'scroller',
                headerText: 'Zeitpunkt auswählen',
                onSelect: function(valueText, inst) {
                    $logging.d('dateSelect: Selected value: ' + valueText);

                    var newTimestamp = new Date(valueText);

                    $eventBus.trigger('time_scroller_selected', {
                        from: thisView.name,
                        value: newTimestamp.getTime()
                    });
                },
                onBeforeShow: function(inst) {
                    // inst.setValue(new Date(thisView.imageModel.get('time')));
                }
            });
            return this;
        }
    });

    return DateselectView;
});
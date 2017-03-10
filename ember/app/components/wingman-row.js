import Ember from 'ember';
import { conditional, tag } from 'ember-awesome-macros';
import { htmlSafe } from 'ember-awesome-macros/string';

export default Ember.Component.extend({
  tagName: 'tr',
  classNames: ['selectable'],

  flight: Ember.computed.alias('nearFlight.flight'),
  igcFile: Ember.computed.alias('flight.igcFile'),
  pilot: Ember.computed.alias('flight.pilot'),
  pilotName: Ember.computed.or('flight.pilot.name', 'flight.pilotName'),
  copilot: Ember.computed.alias('flight.copilot'),
  copilotName: Ember.computed.or('flight.copilot.name', 'flight.copilotName'),
  times: Ember.computed.alias('nearFlight.times'),

  colorStripeStyle: conditional('nearFlight.color', htmlSafe(tag`background-color: ${'nearFlight.color'}`)),

  didInsertElement() {
    let popover_template = '<div class="popover" style="white-space: nowrap; z-index: 5000;">' +
                             '<div class="arrow"></div>' +
                             '<h3 class="popover-title"></h3>' +
                             '<div class="popover-content"></div>' +
                           '</div>';

    this.$('.times-column').popover({
      html: true,
      container: '#fullscreen-content',
      title: 'Periods',
      placement: 'right',
      trigger: 'hover',
      content: this.$('.times-table').html(),
      template: popover_template,
    });

    this.$('[rel=tooltip]').tooltip();
  },
});

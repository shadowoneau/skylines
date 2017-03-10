import Ember from 'ember';
import { or, eq, not } from 'ember-awesome-macros';

export default Ember.Component.extend({
  tagName: 'tr',
  classNameBindings: ['isPrivate:not_published'],

  flight: null,

  pilotName: or('flight.pilot.name', 'flight.pilotName'),
  copilotName: or('flight.copilot.name', 'flight.copilotName'),

  isPublic: eq('flight.privacyLevel', 0),
  isPrivate: not('isPublic'),
});

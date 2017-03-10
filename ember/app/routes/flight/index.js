import Ember from 'ember';
import RSVP from 'rsvp';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    let ajax = this.get('ajax');
    let id = this.modelFor('flight').ids[0];

    return RSVP.hash({
      data: ajax.request(`/api/flights/${id}/?extended`),
      path: ajax.request(`/api/flights/${id}/json`),
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('ids', this.modelFor('flight').ids);
    controller.set('model', model.data);
    controller.set('_primaryFlightPath', model.path);
  },
});

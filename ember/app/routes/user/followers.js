import Ember from 'ember';

export default Ember.Route.extend({
  ajax: Ember.inject.service(),

  model() {
    let { user_id } = this.paramsFor('user');
    return this.get('ajax').request(`/api/users/${user_id}/followers`);
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.set('user', this.modelFor('user'));
    controller.set('followers', model.followers);
  },
});

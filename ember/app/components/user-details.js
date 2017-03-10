import Ember from 'ember';
import { task } from 'ember-concurrency';

import safeComputed from '../computed/safe-computed';

export default Ember.Component.extend({
  account: Ember.inject.service(),
  ajax: Ember.inject.service(),

  editable: safeComputed('account.user.id', 'user.id', (accountId, userId) => accountId && accountId === userId),

  followTask: task(function * () {
    let userId = this.get('user.id');
    yield this.get('ajax').request(`/api/users/${userId}/follow`);
    this.set('user.followed', true);
    this.incrementProperty('user.followers');
  }).drop(),

  unfollowTask: task(function * () {
    let userId = this.get('user.id');
    yield this.get('ajax').request(`/api/users/${userId}/unfollow`);
    this.set('user.followed', false);
    this.decrementProperty('user.followers');
  }).drop(),
});

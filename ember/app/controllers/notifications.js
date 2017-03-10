import Ember from 'ember';
import { task } from 'ember-concurrency';

import safeComputed from '../computed/safe-computed';

export default Ember.Controller.extend({
  ajax: Ember.inject.service(),
  notifications: Ember.inject.service(),

  queryParams: ['page', 'user', 'type'],
  page: 1,
  user: null,
  type: null,

  events: Ember.computed.alias('model.events'),

  prevPage: safeComputed('page', page => {
    if (page > 1) {
      return page - 1;
    }
  }),

  nextPage: safeComputed('page', 'events.length', 'perPage', (page, numEvents, perPage) => {
    if (numEvents == perPage) {
      return page + 1;
    }
  }),

  isFirstPage: Ember.computed.equal('page', 1),
  unreadEvents: Ember.computed.filterBy('events', 'unread', true),
  hasUnreadOnPage: Ember.computed.notEmpty('unreadEvents'),
  hasUnread: Ember.computed.and('isFirstPage', 'hasUnreadOnPage'),

  markAsReadTask: task(function * () {
    yield this.get('ajax').request('/api/notifications/clear', { method: 'POST' });
    this.get('model.events').forEach(event => Ember.set(event, 'unread', false));
    this.set('notifications.counter', 0);
  }).drop(),
});

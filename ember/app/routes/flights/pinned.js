import Ember from 'ember';
import BaseRoute from './-base';

export default BaseRoute.extend({
  pinnedFlights: Ember.inject.service(),

  model(params) {
    let pinned = this.get('pinnedFlights.pinned') || [];
    if (pinned.length === 0) {
      return { count: 0, flights: [] };
    }

    return this.get('ajax').request(`/api/flights/list/${pinned.join(',')}`, {
      data: {
        page: params.page,
        column: params.column,
        order: params.order,
      },
    });
  },
});

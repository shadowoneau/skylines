import Ember from 'ember';

import FixCalc from '../utils/fix-calc';
import FlighPhase from '../utils/flight-phase';

export default Ember.Component.extend({
  ajax: Ember.inject.service(),
  pinnedFlights: Ember.inject.service(),
  units: Ember.inject.service(),

  classNames: ['relative-fullscreen'],

  fixCalc: null,
  flightPhase: null,

  init() {
    this._super(...arguments);

    let ajax = this.get('ajax');
    let units = this.get('units');

    let fixCalc = FixCalc.create({ ajax, units });
    fixCalc.addFlight(this.get('_primaryFlightPath'));
    this.set('fixCalc', fixCalc);

    let flightPhase = FlighPhase.create({ fixCalc });
    this.set('flightPhase', flightPhase);
  },

  didInsertElement() {
    let fixCalc = this.get('fixCalc');

    let sidebar = this.$('#sidebar').sidebar();

    this.$('#barogram_panel').resize(() => {
      let height = this.$('#barogram_panel').height() + 10;
      sidebar.css('bottom', height);
      this.$('.ol-scale-line').css('bottom', height);
      this.$('.ol-attribution').css('bottom', height);
    });

    if (window.location.hash &&
      sidebar.find(`li > a[href="#${window.location.hash.substring(1)}"]`).length != 0) {
      sidebar.open(window.location.hash.substring(1));
    }

    let [primaryId, ...otherIds] = this.get('ids');

    let map = window.flightMap.get('map');

    otherIds.forEach(id => fixCalc.addFlightFromJSON(`/api/flights/${id}/json`));

    let extent = fixCalc.get('flights').getBounds();
    map.getView().fit(extent, map.getSize(), { padding: this._calculatePadding() });

    this.get('pinnedFlights.pinned')
      .filter(id => id !== primaryId)
      .forEach(id => fixCalc.addFlightFromJSON(`/api/flights/${id}/json`));
  },

  timeInterval: Ember.computed('mapExtent', 'cesiumEnabled', function() {
    if (this.get('cesiumEnabled')) return null;

    let extent = this.get('mapExtent');
    if (!extent) return null;

    let interval = this.get('fixCalc.flights').getMinMaxTimeInExtent(extent);

    return (interval.max == -Infinity) ? null : [interval.min, interval.max];
  }),

  _calculatePadding() {
    return [20, 20, this.$('#barogram_panel').height() + 20, this.$('#sidebar').width() + 20];
  },

  actions: {
    togglePlayback() {
      this.get('fixCalc').togglePlayback();
    },

    addFlight(data) {
      this.get('fixCalc').addFlight(data);
    },

    removeFlight(id) {
      let flights = this.get('fixCalc.flights');
      flights.removeObjects(flights.filterBy('id', id));
      this.get('pinnedFlights').unpin(id);
    },

    selectWingman(id) {
      let fixCalc = this.get('fixCalc');
      let pinnedFlights = this.get('pinnedFlights');

      let flights = fixCalc.get('flights');
      let matches = flights.filterBy('id', id);
      if (matches.length !== 0) {
        flights.removeObjects(matches);
        pinnedFlights.unpin(id);
      } else {
        fixCalc.addFlightFromJSON(`/api/flights/${id}/json`);
        pinnedFlights.pin(id);
      }
    },

    calculatePadding() {
      return this._calculatePadding();
    },
  },
});

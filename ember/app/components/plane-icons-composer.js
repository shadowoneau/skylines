import Ember from 'ember';
import ol from 'openlayers';

export default Ember.Component.extend({
  tagName: '',

  map: null,
  fixes: null,

  fixesObserver: Ember.observer('fixes.@each.pointXY', function() {
    Ember.run.once(this.get('map'), 'render');
  }),

  init() {
    this._super(...arguments);

    this.set('icons', {});
    this.set('styles', {});

    this._initStyle('glider', {
      size: [40, 24],
      src: '/images/glider_symbol.png',
    });

    this._initStyle('motorglider', {
      size: [40, 24],
      src: '/images/motorglider_symbol.png',
    });

    this._initStyle('paraglider', {
      size: [40, 24],
      src: '/images/paraglider_symbol.png',
    });

    this._initStyle('hangglider', {
      size: [40, 14],
      src: '/images/hangglider_symbol.png',
    });
  },

  _initStyle(key, { src, size }) {
    let icon = new ol.style.Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: 'fraction',
      anchorYUnits: 'fraction',
      size,
      src,
      rotation: 0,
      rotateWithView: true,
    });

    icon.load();

    let style = new ol.style.Style({ image: icon });

    this.set(`icons.${key}`, icon);
    this.set(`styles.${key}`, style);
  },

  didInsertElement() {
    this.get('map').on('postcompose', this.onPostCompose, this);
  },

  willDestroyElement() {
    this.get('map').un('postcompose', this.onPostCompose, this);
  },

  onPostCompose(e) {
    this.renderIcons(e.vectorContext);
  },

  renderIcons(context) {
    let icons = this.get('icons');
    let styles = this.get('styles');

    this.get('fixes').forEach(fix => {
      let point = fix.get('pointXY');

      if (point) {
        let type = Ember.getWithDefault(fix, 'flight.model.type', 'glider');
        let icon = icons[type] || icons['glider'];
        let style = styles[type] || styles['glider'];

        icon.setRotation(fix.get('heading'));
        context.setStyle(style);
        context.drawGeometry(point);
      }
    });
  },
});

import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import { task } from 'ember-concurrency';

const Validations = buildValidations({
  files: {
    descriptionKey: 'file-upload-field',
    validators: [
      validator('presence', true),
    ],
    debounce: 0,
  },
  pilotId: {
    descriptionKey: 'pilot',
    validators: [],
    debounce: 0,
  },
  pilotName: {
    descriptionKey: 'pilot',
    validators: [
      validator('length', { max: 255 }),
    ],
    debounce: 500,
  },
});

export default Ember.Component.extend(Validations, {
  ajax: Ember.inject.service(),
  account: Ember.inject.service(),

  classNames: ['panel-body'],

  clubMembers: [],

  pilotId: Ember.computed.oneWay('account.user.id'),
  pilotName: null,

  error: null,

  showPilotNameInput: Ember.computed.equal('pilotId', null),

  uploadTask: task(function * () {
    let form = this.$('form').get(0);
    let data = new FormData(form);

    try {
      let json = yield this.get('ajax').request('/api/flights/upload/', { method: 'POST', data, contentType: false, processData: false });
      this.getWithDefault('onUpload', Ember.K)(json);

    } catch (error) {
      this.set('error', error);
    }
  }).drop(),

  actions: {
    setFilesFromEvent(event) {
      this.set('files', event.target.value);
    },

    submit() {
      this.validate().then(({ validations }) => {
        if (validations.get('isValid')) {
          this.get('uploadTask').perform();
        }
      });
    },
  },
});

import config from '../config/environment';
import TotangoService from 'ember-cli-totango/services/totango';
import Ember from 'ember';
var emberCliTotangoConfig = Ember.get(config, 'ember-cli-totango') || {disable: true};
export default TotangoService.extend(emberCliTotangoConfig);
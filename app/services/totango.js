import config from '../config/environment';
import TotangoService from 'ember-cli-totango/services/totango';
import Ember from 'ember';
var totangoOptions = Ember.get(config, 'ember-cli-totango.totangoOptions');
export default TotangoService.extend(totangoOptions ? {
	totangoOptions: totangoOptions
} : {});
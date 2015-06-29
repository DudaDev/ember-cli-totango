import Ember from 'ember';
import injectScript from 'ember-inject-script';
import {
	MISSING_SCRIPT_URL, MISSING_TOTANGO_OPTIONS
}
from 'ember-cli-totango/utils/error-messages';
import defaults from 'ember-cli-totango/utils/defaults';

var defaultsMixin = Ember.Mixin.create(Ember.$.extend({}, defaults));

export default (Ember.Service || Ember.Object).extend({
	_deferred: null,

	_totango: null,

	initDeferred: function() {
		this.set('_deferred', Ember.RSVP.defer());
	}.on('init'),

	loadScript: function() {
		var rejectFn = this.get('_deferred').reject,
			resolveFn = this.get('_deferred').resolve;
		if (!this.get('disabled')){
			if (!this.get('scriptUrl')) {
				rejectFn(new Error(MISSING_SCRIPT_URL));
				return;
			}
			if (!this.get('totangoOptions')) {
				rejectFn(new Error(MISSING_TOTANGO_OPTIONS));
				return;
			}
			window.totango_options = this.get('totangoOptions');
			if (this.get('scriptUrl')) {
				injectScript(this.get('scriptUrl'))
					.then(Ember.run.bind(this, function() {
						var totango = window.totango;
						this.set('_totango', window.totango);
						resolveFn(totango);
					}))['catch'](Ember.run.bind(null, rejectFn));
			}	
		} else {
			this.set('_totango', {disabled: true});
			resolveFn(this.get('_totango'));
		}
	},

	promise: Ember.computed(function() {
		this.loadScript();
		return this.get('_deferred').promise;
	}),

	instance: Ember.computed(function() {
		return this.get('_totango');
	}),

	scriptUrl: null,

	totangoOptions: null,
	
	disabled: false

}, defaultsMixin);
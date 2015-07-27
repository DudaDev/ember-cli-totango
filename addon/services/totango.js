import Em from 'ember';
import injectScript from 'ember-inject-script';
import {
	MISSING_SCRIPT_URL, MISSING_TOTANGO_OPTIONS
}
from 'ember-cli-totango/utils/error-messages';
import defaults from 'ember-cli-totango/utils/defaults';
import $ from 'jquery';

const {
		extend
	} = $, 
	{
		Mixin,
		computed,
		run : {
			bind
		},
		on,
		RSVP: {
			defer
		},
		Service
	} = Em;

var defaultsMixin = Mixin.create(extend({}, defaults));

export default (Service || Em.Object).extend({

	_deferred: null,

	_totango: null,

	initDeferred: on('init', function() {
		this.set('_deferred', defer());
	}),

	loadScript: function() {
		var rejectFn = this.get('_deferred').reject,
			resolveFn = this.get('_deferred').resolve;
		if (!this.get('disabled')) {
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
					.then(bind(this, function() {
						var totango = window.totango;
						this.set('_totango', window.totango);
						resolveFn(totango);
					}))['catch'](bind(null, rejectFn));
			}
		} else {
			this.set('_totango', {
				disabled: true
			});
			resolveFn(this.get('_totango'));
		}
	},

	promise: computed(function() {
		this.loadScript();
		return this.get('_deferred').promise;
	}),

	instance: computed(function() {
		return this.get('_totango');
	}),

	scriptUrl: null,

	totangoOptions: null,

	disabled: false

}, defaultsMixin);
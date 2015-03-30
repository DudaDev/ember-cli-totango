import Ember from 'ember';
import TotangoService from '../services/totango';
import config from '../config/environment';

if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== 'function') {
			// closest thing possible to the ECMAScript 5
			// internal IsCallable function
			throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}

function initializeWithConfig(config, container, application) {
	var deferred = Ember.RSVP.defer(),
		service,
		shouldAdvance = false;
	if (Ember.get(config, 'ember-cli-totango.loadOnInit')) {
		application.deferReadiness();
		shouldAdvance = true;
		service = TotangoService.create();
		service.get('promise')
			.then(function(totango) {
				deferred.resolve();
			})['catch'](function() {
				Ember.Logger.error('Could not load totango');
				deferred.reject();
			});
	} else {
		deferred.resolve();
	}
	deferred.promise['finally'](function() {
		if (shouldAdvance) {
			application.advanceReadiness();
		}
	});
	return deferred.promise;
}

var initialize = initializeWithConfig.bind(null, config);

export {
	initialize,
	initializeWithConfig
};

export default {
	name: 'totango-service',
	initialize: initialize
};
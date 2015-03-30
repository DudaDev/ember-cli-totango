import {
	moduleFor,
	test
}
from 'ember-qunit';
import Ember from 'ember';
import {
	MISSING_SCRIPT_URL, MISSING_TOTANGO_OPTIONS
}
from 'ember-cli-totango/utils/error-messages';

moduleFor('service:totango', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
	var service = this.subject();
	assert.ok(service);
});

test('it fails when missing options', function(assert) {
	assert.expect(3);
	var service = this.subject({
		totangoOptions: null
	});
	var resFn;
	var promise = new Ember.RSVP.Promise(function(resolve) {
		resFn = Ember.run.bind(null, resolve);
	});
	service.get('promise')['catch'](function(error) {
		assert.equal(error.message, MISSING_TOTANGO_OPTIONS, 'Expected error was thrown');
		assert.ok(!window.totango, 'Totango is not defined');
		assert.ok(!window.totango_options, 'Totango options are not defined');
		resFn();
	});
	return promise;
});

test('it fails when missing scriptUrl', function(assert) {
	assert.expect(3);
	var service = this.subject({
		scriptUrl: null
	});
	var resFn;
	var promise = new Ember.RSVP.Promise(function(resolve) {
		resFn = Ember.run.bind(null, resolve);
	});
	service.get('promise')['catch'](function(error) {
		assert.equal(error.message, MISSING_SCRIPT_URL, 'Expected error was thrown');
		assert.ok(!window.totango, 'Totango is not defined');
		assert.ok(!window.totango_options, 'Totango options are not defined');
		resFn();
	});
	return promise;
});

test('it fetches the totango script', function(assert) {
	assert.expect(3);
	var service = this.subject();
	return service.get('promise')
		.then(function(totango) {
			assert.ok(!!window.totango_options, 'Totango options are defined on the window');
			assert.ok(!!window.totango, 'Totango is defined on the window');
			assert.ok(!!totango, 'Totango was resolved');
		})['catch'](function(error) {
			assert.ok(false, 'Totango promise should have been resolved');
		});
});

test('it returns appropriate image DOM element on track', function(assert) {
	assert.expect(4);
	var service = this.subject();
	service.get('promise').then(function(totango){
		var result = totango.track("Share Document", "Document Management");
		assert.ok(result, 'track did not returned null');
		assert.ok(result.nodeName, 'track returned DOM element');
		assert.equal('img', result.nodeName.toLowerCase(), 'track returned image DOM element');
		assert.ok(result.src, 'http://sdr.totango.com/pixel.gif/?sdr_s=SP-0000-00&amp;sdr_o=102213x&amp;sdr_u=marlo%40barksdale.com&amp;sdr_a=Share%20Document&amp;sdr_m=Document%20Management&amp;sdr_odn=Barksdale%20Industries&amp;sdrurl=http%3A%2F%2Flocalhost%3A4200%2F&amp;r=0.5471000692341477&amp;sdr_heartbeat=60&amp;sdr_heartbeat_idle=60');
	});
});


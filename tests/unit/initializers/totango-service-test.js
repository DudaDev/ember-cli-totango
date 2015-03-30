import Ember from 'ember';
import { initializeWithConfig } from '../../../initializers/totango-service';
import { module, test } from 'qunit';

var container, application;

module('TotangoServiceInitializer', {
  beforeEach: function() {
    window.totango = false;
    window.totango_options = false; 
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initializeWithConfig({}, container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('it does not load totango on init', function(assert) {
  return initializeWithConfig({
    'ember-cli-totango': {
      'loadOnInit': false,
      'totangoOptions': {}
    }
  }, container, application).then(function(){
    assert.ok(!window.totango);
  });
});

test('it loads totango on init', function(assert) {
  return initializeWithConfig({
    'ember-cli-totango': {
      'loadOnInit': true,
      'totangoOptions': {}
    }
  }, container, application).then(function(){
    assert.ok(!!window.totango);
  });
});
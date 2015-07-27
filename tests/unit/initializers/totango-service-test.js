import Ember from 'ember';
import { initializeWithConfig } from '../../../initializers/totango-service';
import { module, test } from 'qunit';

var registry, application;

module('Unit | Initializer | totango service', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      registry = application.registry;
      window.totango = null;
      window.totango_options = null;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initializeWithConfig({}, registry, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

test('it does not load totango on init', function(assert) {
  return initializeWithConfig({
    'ember-cli-totango': {
      'loadOnInit': false,
      'totangoOptions': {}
    }
  }, registry, application).then(function(){
    assert.ok(!window.totango);
  });
});

test('it loads totango on init', function(assert) {
  return initializeWithConfig({
    'ember-cli-totango': {
      'loadOnInit': true,
      'totangoOptions': {}
    }
  }, registry, application).then(function(){
    assert.ok(!!window.totango);
  });
});

# ember-cli-totango 
[![Build Status](https://travis-ci.org/DudaDev/ember-cli-totango.svg?branch=master)](https://travis-ci.org/DudaDev/ember-cli-totango)
[![npm version](https://badge.fury.io/js/ember-cli-totango.svg)](http://badge.fury.io/js/ember-cli-totango)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-totango.svg)](http://emberobserver.com/addons/ember-cli-totango)

An Ember service for [Totango Javascript Collector](http://support.totango.com/hc/en-us/articles/203639575-Totango-Javascript-Collector) library.

##Prerequisites

Ember >= 1.10.0

## Installation

```bash
npm install ember-cli-totango --save-dev
```

## Defining Totango Options

```javascript
// config/enviroment.js

module.exports = function(environment) {
	var ENV = {
	// ...
		'ember-cli-totango': {
			totangoOptions: {
				service_id: "SP-0000-00",
				user: {
				  id: "marlo@barksdale.com"
				},
				account: {
				  id: "102213x",
				  name: "Barksdale Industries"
				},
				module: "Managers-App"
			}
		}	
	// ...
	}
	
	// ...
}
```

## Injecting

```javascript
// app/components/x-comp.js
export defaultEmber.Component.extend({
	totango: Ember.inject.service()
})
```

## Invoking Totango API
By default the totango script will be loaded only on demand. Thus, in order to get the `totango` instance you should use the '`promise' property:

```javascript
// app/components/x-comp.js
export defaultEmber.Component.extend({
	totango: Ember.inject.service(),
	click: function(){
		this.get('totango.promise').then(function(totango){
			totango.track("Share Document", "Document Management");
		});
	}
})
```

## Load on Init
In order to load the Totango script on app init, you can set the `loadOnInit` to `true`
```javascript
// config/enviroment.js

module.exports = function(environment) {
	var ENV = {
	// ...
		'ember-cli-totango': {
			totangoOptions: {
				// your options go here
			},
			loadOnInit: true
		}	
	// ...
	}
	
	// ...
}
```

Then you can use the `instance` property:  

```javascript
// app/components/x-comp.js

export defaultEmber.Component.extend({
	totango: Ember.inject.service(),
	click: function(){
		var totango = this.get('totango.instance');
		totango.track("Share Document", "Document Management");
	}
})
```
## Disabling

For disabling Totango, just leave out `'ember-cli-totango'` from your config. In this case, the Totango service 'instance' property will simply be `{disabled: true}`


# License

 This library is lovingly brought to you by the Duda developers. We've released it under the MIT license.

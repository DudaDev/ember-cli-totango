import Ember from 'ember';
export default Ember.Route.extend({
	totango: Ember.inject.service(),
	model: function(){
		return {
			someKey: 'someValue'
		};
	},
	actions: {
		track: function(){
			this.get('totango.promise').then(function(totango){
				totango.track("Share Document", "Document Management");
				window.alert('called: totango.track("Share Document", "Document Management");');
			});
		}
	}
});
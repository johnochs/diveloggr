Diveloggr.Collections.SortedEntries = Backbone.Collection.extend({
	initialize: function () {
		//timescale is measure in hours
		this.timescale = 60 * 24;
		this.onlyMe = false;
	},
	
	url: 'api/entries',
	
	
})
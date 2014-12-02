Diveloggr.Collections.Entries = Backbone.Collection.extend({
	url: "api/entries",
  model: Diveloggr.Models.Entry,
	getOrFetch: function (id) {
		var entries = this;
		var entry = this.get(id) || new Diveloggr.Models.Entry({ id: id });
	
		entry.fetch({
			success: function () { entries.add(entry); }
		});
		return entry;
	}
});

Diveloggr.Collections.entries = new Diveloggr.Collections.Entries;

//Immediately fetches the collection and builds the Diveloggr markerHash

Diveloggr.Collections.entries.fetch({
	success: function() {
		Diveloggr.Collections.entries.each( function(entry) {
			var marker = new google.maps.Marker({
				position: new google.maps.LatLng(
					parseFloat(entry.get('latitude')), parseFloat(entry.get('longitude'))
				),
				map: Diveloggr.map,
				title: entry.escape('title'),
				icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			});
			Diveloggr.markerHash[entry.get('id')] = marker;
		});
	}
});


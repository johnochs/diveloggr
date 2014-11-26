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

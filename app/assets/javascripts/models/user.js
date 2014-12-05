Diveloggr.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	entries: function () {
		if(!this._entries) {
			this._entries = new Diveloggr.Collections.Entries;
		}
		//return this._entries.where({ user_id: parseInt(this.id) })
		var filteredArray = this._entries.where({ user_id: parseInt(this.id) });
		this._entries = new Diveloggr.Collections.Entries(filteredArray, { parse: true });
		debugger
		return this._entries;
	},
});

Diveloggr.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	entries: function () {
		if(!this._entries) {
			this._entries = new Diveloggr.Collections.Entries;
		}
		//return this._entries.where({ user_id: parseInt(this.id) })
		return this._entries
	},
});

Diveloggr.Models.Entry = Backbone.Model.extend({
	urlRoot: "api/entries",
	user: function () {
		if (!this._user) {
			this._user = Diveloggr.Collections.users.getOrFetch(this.attributes.user_id);
		}
		// debugger
		return this._user;
	}
});

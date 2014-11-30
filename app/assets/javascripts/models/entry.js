Diveloggr.Models.Entry = Backbone.Model.extend({
	urlRoot: "api/entries",
	user: function () {
		if (!this._user) {
			this._user = new Diveloggr.Models.User({ id: this.attributes.user_id });
		}
		return this._user;
	},
	parse: function (jsonResp) {
		if (jsonResp.user) {
			this.user().set(jsonResp.user, { parse: true });
			delete jsonResp.user;
		}
		return jsonResp;
	}
});

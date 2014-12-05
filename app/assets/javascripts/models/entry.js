Diveloggr.Models.Entry = Backbone.Model.extend({
	urlRoot: "api/entries",
	images: function () {
		if (!this._images) {
			this._images = new Diveloggr.Collections.Images;
		}
		return this._images;
	},
	user: function () {
		if (!this._user) {
			this._user = new Diveloggr.Models.User({ id: this.attributes.user_id });
		}
		return this._user;
	},
	parse: function (jsonResp) {
		if(jsonResp.user) {
			this.user().set(jsonResp.user, { parse: true });
			delete jsonResp.user;
		}
		var that = this;
		if(jsonResp.images) {
			this.images().reset(jsonResp.images, { parse: true });
			delete jsonResp.images
		}
		return jsonResp;
	}
});

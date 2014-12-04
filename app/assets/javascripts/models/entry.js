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
		if (jsonResp.user) {
			this.user().set(jsonResp.user, { parse: true });
			delete jsonResp.user;
		}
		if (jsonResp.images) {
			var toParse = [];
			_(this.images()).each( function (image) {
				if (image.imageable_id === that.id) {
					toParse.push(image);
				}
			})
			var parsed = this.images().parse(toParse);
			this.images().add(parsed, { merge: true });
			delete jsonResp.images
		}
		return jsonResp;
	}
});

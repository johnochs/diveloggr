Diveloggr.Models.User = Backbone.Model.extend({
	urlRoot: "api/users",
	entries: function () {
		if(!this._entries) {
			this._entries = new Diveloggr.Collections.Entries;
		}
		return this._entries;
	},
	image: function () {
		if(!this._image) {
			this._image = new Diveloggr.Models.Image;
		}
		return this._image;
	},
	parse: function (jsonResp) {
		if(jsonResp.entries) {
			this.entries().set(jsonResp.entries, { parse: true });
			delete jsonResp.entries;
		}
		if(jsonResp.image) {
			this.image().set(jsonResp.image, { parse: true});
			delete jsonResp.image;
		}
		return jsonResp;
	}
});

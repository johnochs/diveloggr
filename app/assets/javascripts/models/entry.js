Diveloggr.Models.Entry = Backbone.Model.extend({
	urlRoot: "api/entries",
	images: function () {
		if (!this._images) {
			this._images = new Diveloggr.Collections.Images([], {});
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
		// debugger
		var that = this;
		if (jsonResp.images) {
			// jsonResp.images.forEach( function (image) {
			// 	var model = new Diveloggr.Models.Image;
			// 	var trueModel = model.set(image);
			// 	debugger
			// 	if (trueModel.get('imageable_id') === parseInt(that.get('id'), 10)) {
			// 		if (model.get('l_url')) {
			// 			that.images().add(model);
			// 		}
			// 		// debugger
			// 	}
			// })
			this.images().reset(jsonResp.images, { parse: true });
		}
		return jsonResp;
	}
});

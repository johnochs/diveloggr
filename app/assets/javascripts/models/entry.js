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
			this.images().set(jsonResp.images, { parse: true });
			delete jsonResp.images
		}
		
		this.set('marker', new google.maps.Marker({
			position: new google.maps.LatLng(
				parseFloat(jsonResp.latitude), parseFloat(jsonResp.longitude)
			),
			map: null,
			title: jsonResp.title,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
						})
						);
		return jsonResp;
	}
});

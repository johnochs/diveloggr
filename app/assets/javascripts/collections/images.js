Diveloggr.Collections.Images = Backbone.Collection.extend({
	url: "api/images",

  model: Diveloggr.Models.Image,
	
	getOrFetch: function (id) {
		var images = this;
		var image = this.get(id) || new Diveloggr.Models.Image({ id: id });
		
		user.fetch({
			success: function () { images.add(image) }
		});
		return image;
	}

});
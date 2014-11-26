Diveloggr.Collections.Users = Backbone.Collection.extend({
	url: "api/users",

  model: Diveloggr.Models.User,
	
	getOrFetch: function (id) {
		var users = this;
		var user = this.get(id) || new Diveloggr.Models.User({ id: id });
		
		user.fetch({
			success: function { users.add(user)}
		});
		return user;
	}

});

Diveloggr.Collections.users = new Diveloggr.Collections.Users();

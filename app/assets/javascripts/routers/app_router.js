Diveloggr.Routers.Router = Backbone.Router.extend({
	routes: {
		"" : "home",
		"/users": "usersIndex",
		"/users/:id/edit": "userEdit",
		"/users/:id": "userShow"
		
	},
	home: function () {
	},
	usersIndex: function () {
		var users = Diveloggr.Collections.users.fetch();
		var userIndexView = new Diveloggr.Views.
	}
	
})
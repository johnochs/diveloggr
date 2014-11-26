Diveloggr.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},
	routes: {
		"" : "home",
		"users": "usersIndex",
		"users/:id/edit": "userEdit",
		"users/:id": "userShow",
		"entries": "entriesIndex",
		"entries/:id/edit": "entriesEdit",
		"entries/:id": "entriesShow",
		"entries/new": "entriesNew"
	},
	home: function () {
	},
	usersIndex: function () {
		var users = Diveloggr.Collections.users.fetch();
		var userIndexView = new Diveloggr.Views.UsersIndex({ collection: users });
	},
	entriesIndex: function () {
		Diveloggr.Collections.entries.fetch();
		var entriesIndex = new Diveloggr.Views.EntriesIndex({ collection:  Diveloggr.Collections.entries });
		this._swapView(entriesIndex);
		
	},
	entriesNew: function () {
		var entry = new Diveloggr.Models.Entry;
		var entryForm = new Diveloggr.Views.EntriesNew({ model: entry });
		this._swapView(entryForm);
	},
	_swapView: function (view) {
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
})
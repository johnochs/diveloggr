Diveloggr.Routers.Router = Backbone.Router.extend({
	initialize: function (options) {
		this.$rootEl = options.$rootEl
	},
	routes: {
		"" : "splashPage",
		"feed": "feedPage",
		"users": "usersIndex",
		"users/:id/edit": "userEdit",
		"users/:id": "userShow",
		"entries/new": "entriesNew",
		"entries": "entriesIndex",
		"entries/:id/edit": "entriesEdit",
		"entries/:id": "entriesShow",
	},
	splashPage: function () {
		var splashView = new Diveloggr.Views.SplashPage();
		this._swapView(splashView);
	},
	feedPage: function () {
		Diveloggr.Collections.entries.fetch({wait: true});
		var feedView = new Diveloggr.Views.FeedView({
			collection: Diveloggr.Collections.entries
		});
		this._swapView(feedView);
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
		var entryForm = new Diveloggr.Views.EntriesForm({ model: entry, collection: Diveloggr.Collections.entries });
		this._swapView(entryForm);
	},
	entriesEdit: function (id) {
		var entry = Diveloggr.Collections.entries.getOrFetch(id);
		var entryForm = new Diveloggr.Views.EntriesForm({ model: entry });
		this._swapView(entryForm);
	},
	entriesShow: function (id) {
		var entry = Diveloggr.Collections.entries.getOrFetch(id);
		var showView = new Diveloggr.Views.EntriesShow({ model: entry });
		this._swapView(showView);
	},
	_swapView: function (view) {
		this._currentView && this._currentView.removeGoogELs();
		this._currentView && this._currentView.remove();
		this._currentView = view;
		this.$rootEl.html(view.render().$el);
	},
})
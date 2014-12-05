Diveloggr.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "container",
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		if (this.model.entries){
			this.listenTo(this.model.entries(), "add", this.addUserEntry);
			this.listenTo(this.model.entries(), "remove", this.removeUserEntry);
			this.listenTo(this.model.entries(), "sync", this.render);
			this.model.entries().fetch({ async: false });
		}
		
	},
	addUserEntry: function (entry) {
		var userEntryView = new Diveloggr.Views.UserEntry({ model: entry });
		this.addSubview("#user-entry-subview-insertion", userEntryView);
	},
	removeUserEntry: function (entry) {
		var userEntryView = _.find(
			this.subviews("#user-entry-subview-insertion"), function (subview) {
				return subview.model === entry;
			}
		);
		if (userEntryView != undefined) {
			this.removeSubview("#user-entry-subview-insertion", userEntryView);
		}
	},
	render: function () {
		this.model.fetch();
		var entries = this.model.entries();
		var renderedContent = this.template({ user: this.model, entries: entries });
		this.$el.html(renderedContent);
		this.removeSubviews();
		this.attachSubviews()
		return this;
	}
});

Diveloggr.Views.UserEntry = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, 'sync change', this.render);
		this.listenTo(this.model, 'sync change', this.setAttributes);
	},
	template: JST['users/user_entry'],
	tagName: 'tr',
	setAttributes: function () {
		if(this.model.get('id')){
			this.attributes = {'data-entry-id': entry.get('id')};
		}
	},
	events: {
		'mouseenter': 'highliteItem',
		'mouseleave': 'backToNormal',
		'click': 'goShow' 
	},
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	highliteItem: function (event) {
		event.currentTarget.style.background = "black";
		event.currentTarget.style.color = "white"
	},
	backToNormal: function () {
		event.currentTarget.style.background = "";
		event.currentTarget.style.color = "";
	},
	goShow: function (event) {
		Backbone.history.navigate('#entries/' + this.model.toString());
	},
})
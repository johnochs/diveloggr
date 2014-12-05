Diveloggr.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "container",
	initialize: function () {
		debugger
		this.listenTo(this.model, "change", this.render);
		this.listenTo(this.model.entries(), "reset", this.render);
		this.listenTo(this.model.image(), "change", this.render);
	},
	// addUserEntry: function (entry) {
	// 	var userEntryView = new Diveloggr.Views.UserEntry({ model: entry });
	// 	this.addSubview("#user-entry-subview-insertion", userEntryView);
	// },
	// removeUserEntry: function (entry) {
	// 	var userEntryView = _.find(
	// 		this.subviews("#user-entry-subview-insertion"), function (subview) {
	// 			return subview.model === entry;
	// 		}
	// 	);
	// 	if (userEntryView != undefined) {
	// 		this.removeSubview("#user-entry-subview-insertion", userEntryView);
	// 	}
	addUserEntries: function() {
		var that = this;
		this.model.entries().each( function (entry) {
			var entrySubView = new Diveloggr.Views.UserEntry({ model: entry });
			that.addSubview("#user-entry-subview-insertion", entrySubView);
			// debugger
		});
		// this.render();
	},
	render: function () {
		// Diveloggr.Collections.entries.fetch();
		var entries = this.model.entries();
		var renderedContent = this.template({ user: this.model, numEntries: this.model.entries().length });
		debugger
		this.$el.html(renderedContent);
		this.addUserEntries();
		this.attachSubviews();
		return this;
	}
});

Diveloggr.Views.UserEntry = Backbone.CompositeView.extend({
	initialize: function () {
		// alert('UserEntry!');
		this.listenTo(this.model, 'sync change', this.render);
		this.listenTo(this.model, 'sync change', this.setAttributes);
	},
	template: JST['users/user_entry'],
	tagName: 'tr',
	events: {
		'mouseenter': 'highliteItem',
		'mouseleave': 'backToNormal',
		'click': 'goShow' 
	},
	render: function () {
		var renderedContent = this.template({ entry: this.model })
		this.$el.html(renderedContent);
		debugger
		return this;
	},
	highliteItem: function (event) {
		event.preventDefault();
		event.currentTarget.style.background = "black";
		event.currentTarget.style.color = "white"
	},
	backToNormal: function () {
		event.preventDefault();
		event.currentTarget.style.background = "";
		event.currentTarget.style.color = "";
	},
	goShow: function (event) {
		event.preventDefault();
		Backbone.history.navigate('#entries/' + this.model.id.toString());
	},
})
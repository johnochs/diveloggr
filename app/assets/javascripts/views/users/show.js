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
		var entries = this.model.entries();
		var renderedContent = this.template({ user: this.model, entries: entries });
		this.$el.html(renderedContent);
		return this;
	}
})
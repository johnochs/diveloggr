Diveloggr.Views.EntriesShow = Backbone.View.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render)
	},
	events: {
		"click .entry-edit": "editEntry",
		"click .entry-delete": "deleteEntry"
	},
	className: "entry_show container",
	template: JST['entries/show'],
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	editEntry: function () {
		Backbone.history.navigate("#entries/" + this.model.get('id') +"/edit",
		{ trigger: true });
	}
});
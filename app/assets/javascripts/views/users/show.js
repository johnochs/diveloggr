Diveloggr.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "container",
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	render: function () {
		var renderedContent = this.template({ user: this.model });
		this.$el.html(renderedContent);
		return this;
	}
})
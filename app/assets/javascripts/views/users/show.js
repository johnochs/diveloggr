Diveloggr.Views.UserShow = Backbone.CompositeView.extend({
	template: JST['users/show'],
	className: "container",
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		if (this.model.entries){
			this.listenTo(this.model.entries(), "sync", this.render);
			this.model.entries().fetch({async: false});
		}
	},
	render: function () {
		var entries = this.model.entries();
		var renderedContent = this.template({ user: this.model, entries: entries });
		this.$el.html(renderedContent);
		return this;
	}
})
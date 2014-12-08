Diveloggr.Views.Error404 = Backbone.CompositeView.extend({
	template: JST['errors/404'],
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
	}
})
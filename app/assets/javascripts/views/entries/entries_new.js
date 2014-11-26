Diveloggr.Views.EntriesNew = Backbone.CompositeView.extend({
	template: JST['entries/new_form'],
	render: function () {
		var renderedContent = this.template({ model: this.model });
		this.$el.html(renderedContent);
		return this;
	}
});

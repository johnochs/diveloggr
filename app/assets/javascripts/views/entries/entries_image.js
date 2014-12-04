Diveloggr.Views.EntriesImage = Backbone.CompositeView.extend({
	template: JST['entries/image'],
	className: "single-image-element",
	render: function () {
		var renderedContent = this.template({ image: this.model });
		this.$el.html(renderedContent);
		return this;
	},
});
Diveloggr.Views.FeedEntry = Backbone.CompositeView.extend({
	template: JST['feed/feed_entry'],
	tagName: "tr",
	id: this.model.get("id"),
	render: function() {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
})
Diveloggr.Views.FeedEntry = Backbone.CompositeView.extend({
	template: JST['feed/feed_entry'],
	tagName: "tr",
	render: function() {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
})
Diveloggr.Views.FeedEntry = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.model.once("sync", this.render, this);	
	},
	template: JST['feed/feed_entry'],
	tagName: "tr",
	render: function() {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
})
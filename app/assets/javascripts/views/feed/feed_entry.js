Diveloggr.Views.FeedEntry = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.model.once("sync", this.render, this);	
	},
	template: JST['feed/feed_entry'],
	className: "feed-entry-item",
	tagName: "tr",
	events: {
		"mouseover td": "specialThing"
	},
	render: function() {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	specialThing: function(event) {

		alert("ding!" + this.model.id);
	}
})
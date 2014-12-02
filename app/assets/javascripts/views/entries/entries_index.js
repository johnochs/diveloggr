Diveloggr.Views.EntriesIndex = Backbone.CompositeView.extend({
	template: JST['entries/index'],
	initialize: function() {
		this.listenTo(this.collection, "add sync remove", this.render);
	},
	render: function () {
		
		var renderedContent = this.template({ entries: this.collection });
		this.$el.html(renderedContent);
		
		return this;
	}
});

Diveloggr.Views.EntriesNew = Backbone.CompositeView.extend({
	template: JST['entries/new_form'],
	events: {
		"submit": "submitForm"
	},
	render: function () {
		var renderedContent = this.template({ model: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	submitForm: function (event) {
		this.$form = $("#entry_input")
		
	}
});

Diveloggr.Views.EntriesForm = Backbone.CompositeView.extend({
	initialize: function () {
	},
	template: JST['entries/new_form'],
	className: "new_entry_form container",
	events: {
		"submit": "submitForm"
	},
	render: function () {
		var renderedContent = this.template({ model: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	submitForm: function (event) {
		alert("here");
		event.preventDefault();
		var formInput = $('#entry_form_el').serializeJSON();
		var entry = new Diveloggr.Models.Entry(formInput);
		
		function success () {
			Backbone.history.navigate("/entries", { trigger: true});
		}
		
		if (entry.isNew()) {
			this.collection.create(entry, {
				success: success
			});
		} else {
			entry.save({}, {
				success: success
			});
		}
	}
});

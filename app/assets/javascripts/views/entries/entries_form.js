Diveloggr.Views.EntriesForm = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
	},
	template: JST['entries/new_form'],
	className: "new_entry_form container",
	events: {
		"submit": "submitForm"
	},
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		return this;
	},
	submitForm: function (event) {
		event.preventDefault();
		var formInput = $('#entry_form_el').serializeJSON();
		var entry = this.model.set(formInput);
		
		function success () {
			Backbone.history.navigate("/feed", { trigger: true});
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

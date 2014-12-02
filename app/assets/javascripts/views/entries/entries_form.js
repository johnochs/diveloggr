Diveloggr.Views.EntriesForm = Backbone.CompositeView.extend({
	initialize: function () {
		this.model.fetch();
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "sync", this.updateSelected);
		this.listenTo(this.model, "sync", this.updateMap);
	},
	template: JST['entries/new_form'],
	className: "new_entry_form container",
	events: {
		"submit": "submitForm"
	},
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		this.$('#map-container').html(Diveloggr.$mapEl);
		google.maps.event.trigger(Diveloggr.map, 'resize');
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
	},
	updateSelected: function () {
		var that = this;
		_(this.model.attributes).each( function (value, attribute) {
			var searchId = "* #" + attribute;
			that.$el.find(searchId).each( function (){
				if($(this).val() === value) {
					$(this).prop("checked", true);
				}
			});
		});
	},
	updateMap: function () {
		debugger
		if (!this.model.isNew()) {
			// Diveloggr.map.panTo(latLng: { lat: this.model.get('latitude'), lng: this.model.get('longitude')});
			Diveloggr.map.setZoom({ zoom: 15 });
		}
	}
});

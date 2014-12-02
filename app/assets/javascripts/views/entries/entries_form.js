Diveloggr.Views.EntriesForm = Backbone.CompositeView.extend({
	initialize: function () {
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model, "sync", this.updateSelected);
		this.listenTo(this.model, "sync", this.updateMap);
		this.updateMap();
	},
	template: JST['entries/new_form'],
	className: "new_entry_form container",
	events: {
		"submit": "submitForm"
	},
	render: function () {
		google.maps.event.trigger( Diveloggr.map, 'resize');
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
		if (!this.model.isNew()) {
			var lL = new google.maps.LatLng(
						parseFloat(this.model.get('latitude')),
						parseFloat(this.model.get('longitude'))
					 );
			Diveloggr.map.panTo(lL);
			Diveloggr.map.setZoom(15);
		} else {
			var lL = new google.maps.LatLng(37.781083, -122.411542)
			Diveloggr.map.panTo(lL);
			Diveloggr.map.setZoom(15);
		}
	}
});

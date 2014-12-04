Diveloggr.Views.EntriesShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.model.images().fetch();
		this.listenTo(this.model, "sync", this.render)
		this.listenTo(this.model.images(), "add", this.render)
		var wrapper = google.maps.event.addListenerOnce(Diveloggr.map, 'tilesloaded', this.panMap.bind(this));
		this.addGoogEL(wrapper);
	},
	events: {
		"click .entry-edit": "editEntry",
		"click .entry-delete": "deleteEntry"
	},
	className: "entry_show container",
	template: JST['entries/show'],
	render: function () {
		var renderedContent = this.template({ entry: this.model });
		this.$el.html(renderedContent);
		this.$('#map-container').html(Diveloggr.$mapEl);
		google.maps.event.trigger(Diveloggr.map, 'resize');
		return this;
	},
	editEntry: function () {
		Backbone.history.navigate("#entries/" + this.model.get('id') +"/edit",
		{ trigger: true });
	},
	panMap: function() {
		var lL = new google.maps.LatLng(
			parseFloat(this.model.get('latitude')), 
			parseFloat(this.model.get('longitude'))
		);
		Diveloggr.map.panTo(lL);
		Diveloggr.map.setZoom(12);
	}
});
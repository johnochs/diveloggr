Diveloggr.Views.EntriesShow = Backbone.CompositeView.extend({
	initialize: function () {
		this.model.fetch();  //Deleted wait true
		this.listenTo(this.model, "sync", this.render);
		this.listenTo(this.model.images(), "add remove sync", this.render);
		var wrapper = google.maps.event.addListenerOnce(Diveloggr.map, 'tilesloaded', this.panMap.bind(this));
		this.addGoogEL(wrapper);
	},
	events: {
		"click #user-link-button": "goUser",
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
		this.addImages();
		return this;
	},
	editEntry: function (event) {
		event.preventDefault();
		Backbone.history.navigate("#entries/" + this.model.get('id') +"/edit",
		{ trigger: true });
	},
	deleteEntry: function (event) {
		event.preventDefault();
		var model = this.model
		this.model.destroy({
			success: function () {
				Diveloggr.Collections.entries.remove(model);
			}
		});
		var id = this.model.get('id');
		Diveloggr.markerHash[id].setMap(null);
		delete Diveloggr.markerHash[id];
		Backbone.history.navigate("#feed",
		{ trigger: true });
	},
	panMap: function() {
		var lL = new google.maps.LatLng(
			parseFloat(this.model.get('latitude')), 
			parseFloat(this.model.get('longitude'))
		);
		Diveloggr.map.panTo(lL);
		Diveloggr.map.setZoom(12);
	},
	addImages: function() {
		var that = this;
		if (this.model.images()) {
			this.model.images().forEach( function (image) {
				var imageView = new Diveloggr.Views.EntriesImage({ model: image });
				that.addSubview("#images-container", imageView);
			});
		}
	},
	goUser: function (event) {
		Backbone.history.navigate('/users/' + this.model.get('user_id'), { trigger: true });
	}
});
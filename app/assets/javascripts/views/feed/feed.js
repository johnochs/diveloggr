Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render);
		this.listenTo(this.collection, "add", this.addFeedEntryView);
		this.listenTo(this.collection, "remove", this.removeFeedEntryView);
		this.collection.once("sync", this.renderMap, this);
	},
	render: function () {
		this.$el.html(this.template());
		this.attachSubviews();
		this.$('#map-container').html(Diveloggr.$mapEl);
		return this;
	},
	renderMap: function() {
	    google.maps.event.trigger(Diveloggr.map, 'resize');
	    // Diveloggr.map.setCenter(mapOptions.center);
	    Diveloggr.map.setZoom(5);
		this.placeMarkers();
	},
	addFeedEntryView: function (entry) {
		var user = entry.user({wait: true});
		var entrySubview = new Diveloggr.Views.FeedEntry({ model: entry });
		this.addSubview("#entry-table-elements", entrySubview);
	},
	removeFeedEntryView: function (entry) {
		var entrySubview = _.find(
			this.subviews("#entry-table-elements"), function(subview) {
				return subview.model === entry;
			}
		);
		this.removeSubview("#entry-table-elements", entrySubview);
	},
	placeMarkers: function () {
	    var map = Diveloggr.map;
	    // var infowindow = App.infoWindow;
	    this.collection.each(function(entry) {
	      var lat = entry.get('latitude');
	      var lng = entry.get('longitude');
	      var marker = new google.maps.Marker({
	        position: new google.maps.LatLng(lat, lng),
	        title: entry.get('title'),
	        map: map
	      });
	  });
		// var map = Diveloggr.map;
		// var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
		//         var marker = new google.maps.Marker({
		//           position: myLatlng,
		//   draggable:true,
		//           title:"Drag me!",
		//           map: map
        // });
	},

});
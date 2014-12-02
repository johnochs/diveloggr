Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	initialize: function () {
		this.zoomSorted = new Backbone.Collection({ model: Diveloggr.Models.Entry });
		google.maps.event.addListener(Diveloggr.map, 'tilesloaded', this.filterByMapZoom.bind(this));
		this.listenTo(this.collection, "sync", this.filterByMapZoom);
		this.listenTo(this.zoomSorted, "add", this.addFeedEntryView);
		this.listenTo(this.zoomSorted, "remove", this.removeFeedEntryView);
		// this.collection.once("sync", this.renderMap, this);
		// this.filteredCollection = new Backbone.Collection;
	},
	render: function () {
		this.$el.html(this.template());
		this.attachSubviews();
		this.$('#map-container').html(Diveloggr.$mapEl);
		return this;
	},
	addFeedEntryView: function (entry) {
		var user = entry.user();
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
	// addMarker: function (entry) {
	//   var map = Diveloggr.map;
	//       var lat = entry.get('latitude');
	//       var lng = entry.get('longitude');
	//       var marker = new google.maps.Marker({
	//         position: new google.maps.LatLng(lat, lng),
	//         title: entry.get('title'),
	//         map: map
	//       });
	//   Diveloggr.markerHash()[entry.get('id')] = marker;
	// },
	// removeMarker: function (entry) {
	// 	delete Diveloggr.markerHash()[entry.get('id')];
	// },
	// placeMarkers: function () {
	//     var map = Diveloggr.map;
	// 	debugger
	//     // var infowindow = App.infoWindow;
	//     this.zoomSorted.each(function(entry) {
	//       var lat = entry.get('latitude');
	//       var lng = entry.get('longitude');
	//       var marker = new google.maps.Marker({
	//         position: new google.maps.LatLng(lat, lng),
	//         title: entry.get('title'),
	//         map: map
	//       });
	// 	  Diveloggr.markerHash[entry.get('id')] = marker;
	//   }, this);
	// },
	getCurrentMapBounds: function () {

		if (Diveloggr.map.getBounds() === undefined) {
			return;
		}
		this.currentBounds = {};
		this.currentBounds.nLat = parseFloat(Diveloggr.map.getBounds().getNorthEast().lat())
		this.currentBounds.eLng = parseFloat(Diveloggr.map.getBounds().getNorthEast().lng())
		this.currentBounds.sLat = parseFloat(Diveloggr.map.getBounds().getSouthWest().lat())
		this.currentBounds.wLng = parseFloat(Diveloggr.map.getBounds().getSouthWest().lng())
	},
	filterByMapZoom: function () {
		this.getCurrentMapBounds();
		var that = this;
		
		this.zoomSorted.each( function (entry) {
			that.zoomSorted.remove(entry);
		});

		this.collection.each( function(entry) {
			var entryLat = parseFloat( entry.get('latitude') );
			var entryLng = parseFloat( entry.get('longitude') );
			
			if ( that.currentBounds.sLat < entryLat && entryLat < that.currentBounds.nLat ) {
				if (that.currentBounds.wLng < entryLng && entryLng < that.currentBounds.eLng) {
					that.zoomSorted.add(entry);
				}
			}
		});
	},
});

// var map = Diveloggr.map;
// var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
//         var marker = new google.maps.Marker({
//           position: myLatlng,
//   draggable:true,
//           title:"Drag me!",
//           map: map
// });
//TODO: Have the map position itself over the users current location on render.

Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	initialize: function () {
		this.zoomSorted = new Diveloggr.Collections.ZoomSortedEntries;
		google.maps.event.addListener(Diveloggr.map, 'idle', this.filterByMapZoom.bind(this));
		this.listenTo(this.collection, "sync", this.filterByMapZoom);
		this.listenTo(this.zoomSorted, "add", this.addFeedEntryView);
		this.listenTo(this.zoomSorted, "remove", this.removeFeedEntryView);
		this.listenTo(this.zoomSorted, "sync", this.render);
		// this.collection.once("sync", this.renderMap, this);
		// this.filteredCollection = new Backbone.Collection;
	},
	render: function () {
		// this.collection.trigger('sync');
		this.removeLooseMarkers();
		this.$el.html(this.template({ filtered: this.zoomSorted.length }));
		this.removeSubviews();
		this.attachSubviews();
		this.$('#map-container').html(Diveloggr.$mapEl);
		google.maps.event.trigger(Diveloggr.map, 'resize');
		return this;
	},

	addFeedEntryView: function (entry) {
		var entrySubview = new Diveloggr.Views.FeedEntry({ model: entry });
		this.addSubview("#entry-table-elements", entrySubview);
	},
	removeFeedEntryView: function (entry) {
		var entrySubview = _.find(
			this.subviews("#entry-table-elements"), function(subview) {
				return subview.model === entry;
			}
		);
		if (entrySubview != undefined) {
			this.removeSubview("#entry-table-elements", entrySubview);
		}
	},
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
		this.zoomSorted.trigger('sync');
	},
	removeLooseMarkers: function () {
		Diveloggr.looseMarkers.forEach( function (marker) {
			marker.setMap(null);
		});
		Diveloggr.looseMarkers.pop();
	},
});
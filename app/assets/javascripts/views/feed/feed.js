Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	initialize: function () {
		this.googleELAdded = false;
		this.googleResized = false;
		this.zoomSorted = new Diveloggr.Collections.ZoomSortedEntries;
		this.listenToOnce(this.collection, "sync", this.filterByMapZoom);
		this.listenTo(this.zoomSorted, "add", this.addFeedEntryView);
		this.listenTo(this.zoomSorted, "remove", this.removeFeedEntryView);
		this.listenTo(this.zoomSorted, "sort", this.render);
		// this.collection.once("sync", this.renderMap, this);
		// this.filteredCollection = new Backbone.Collection;
	},
	render: function () {
		this.$el.html(this.template());
		this.attachSubviews();
		this.$('#map-container').html(Diveloggr.$mapEl);
		if (!this.googleResized) {
			google.maps.event.trigger(Diveloggr.map, 'resize');
			this.googleResized = true;
		}
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
		if (entrySubview) {
			this.removeSubview("#entry-table-elements", entrySubview);
		}
	},
	getCurrentMapBounds: function () {

		if (Diveloggr.map.getBounds() === undefined) {
			return;
		}
		this.currentBounds = {};
		this.currentBounds.nLat = Diveloggr.map.getBounds().getNorthEast().lat()
		this.currentBounds.eLng = Diveloggr.map.getBounds().getNorthEast().lng()
		this.currentBounds.sLat = Diveloggr.map.getBounds().getSouthWest().lat()
		this.currentBounds.wLng = Diveloggr.map.getBounds().getSouthWest().lng()
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
		
		if (!this.googleELAdded) {
			var wrapper = google.maps.event.addListener(
				Diveloggr.map, 'idle', this.filterByMapZoom.bind(this)
			);
			this.addGoogEL(wrapper);
			this.googleElAdded = true;
		}
		this.zoomSorted.trigger('sync');
	},
});
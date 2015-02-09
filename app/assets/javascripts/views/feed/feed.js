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
	events: {
		"click #filter-just-me": "filterJustMe",
		"click #filter-none": "filterNone"
	},
	render: function () {
		// this.collection.trigger('sync');
		this.removeLooseMarkers();
		this.$el.html(this.template({ filtered: this.zoomSorted.length, stats: this.visCalc() }));
		this.removeSubviews();
		this.attachSubviews();
		this.$('#map-container').html(Diveloggr.$mapEl);
		google.maps.event.trigger(Diveloggr.map, 'resize');
		this.firstViewCheck();
		this.addPhotoFeed();
		return this;
	},
	visCalc: function () {
		var points = [];
		var min = null;
		var mindate = null;
		var max = null;
		var maxdate = null;
		
		this.zoomSorted.each( function (entry) {
			if (entry.has('vis') && entry.get('vis') != null) {
				points.push(entry.get('vis'));
				
				if(min === null || entry.get('vis') < min) {
					min = entry.get('vis');
					mindate = entry.get('entrytime');
				}
				if(max === null || entry.get('vis') > max) {
					max = entry.get('vis');
					maxdate = entry.get('entrytime');
				}
			}
		});
		
		var sum = 0;
		for(var i = 0; i < points.length; i++) {
			sum = sum + points[i];
		}
		var average = sum/points.length;
		if(points.length > 0) {
			return [points.length, average, min, mindate, max, maxdate];		
		} else {
			return [0,"N/A","N/A","N/A","N/A","N/A"];
		}
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
		
		this.zoomSorted.reset();

		this.collection.each( function(entry) {
			var entryLat = parseFloat( entry.get('latitude') );
			var entryLng = parseFloat( entry.get('longitude') );
			
			if ( that.currentBounds.sLat < entryLat && entryLat < that.currentBounds.nLat ) {
				if (that.currentBounds.wLng < entryLng && entryLng < that.currentBounds.eLng) {
					if (Diveloggr.filterJustMe) {
						if(entry.get('user_id') === CURRENT_USER_ID) {
							that.zoomSorted.add(entry);
							Diveloggr.markerHash[entry.get('id')].setMap(Diveloggr.map);
						}
					} else {
						that.zoomSorted.add(entry);
						Diveloggr.markerHash[entry.get('id')].setMap(Diveloggr.map);
						
					}
				}
			}
		});
		this.zoomSorted.trigger('sync');
	},
	filterJustMe: function () {
		Diveloggr.filterJustMe = true;
		this.filterByMapZoom();
		this.render();
	},
	filterNone: function () {
		Diveloggr.filterJustMe = false;
		this.filterByMapZoom();
		this.render();
	},
	removeLooseMarkers: function () {
		Diveloggr.looseMarkers.forEach( function (marker) {
			marker.setMap(null);
		});
		Diveloggr.looseMarkers = [];
	},
	firstViewCheck: function () {
		if(Diveloggr.firstView) {
			var current_user = new Diveloggr.Models.User({ id: CURRENT_USER_ID });
			current_user.fetch({
				wait: true,
				success: function () {
					if (current_user.get('guest') === true) {
						window.currentCAlert = new Diveloggr.Alert();
						window.currentCAlert.render(
							"Guest Reminder",
							"You are currently logged in with a guest user account." +
							"  You may log dives and see other users' logged dives, " +
							"but your dives will not be visible to other users or added " +
							"to Divelogger statistics until you create a full account.  " +
							"Remember: if you do not transition to a full account within 10 days " +
							"of creating your guest user account, it will be deleted.  To create a " +
							"full account, please visit the 'Register Full Account' link in the " +
							"dropdown menu at top.  Also, if you clear your cookies before you register "+
							"a full account, you will no longer have access to this guest user account."
						);
					}
				}
			});
			Diveloggr.firstView = false;
		}
	},
	addPhotoFeed: function () {
		_(this.subviews('.photo-timeline')).each( function (view) {
			view.remove();
		});
		
		var allImages = [];
		this.zoomSorted.each ( function (model) {
			images = model.images()
			images.each ( function (imgModel) {
				if (imgModel.has('m_url')) {
					allImages.push(imgModel)
				}
			});
		});
		
		var that = this;
		
		_(allImages).each( function (img) {
			var photoSubview = new Diveloggr.Views.FeedImage({ model: img });
			that.addSubview('.photo-timeline', photoSubview);
		});
	}
});

Diveloggr.Views.FeedImage = Backbone.CompositeView.extend({
	template: JST['feed/image'],
	render: function () {
		var renderedContent = this.template({ image: this.model });
		debugger
		this.$el.html(renderedContent);
		return this;
	}
})
Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	initialize: function () {
		this.listenTo(this.collection, "sync", this.render)
		this.listenTo(this.collection, "add", this.addFeedEntryView);
	},
	render: function () {
		// this.remove();
		this.$el.html(this.template());
		this.attachSubviews();
		this.renderMap();
		return this;
	},
	renderMap: function() {
		function initialize() {
		  var mapOptions = {
		    zoom: 9,
		    center: new google.maps.LatLng(33.674497, -119.223633)
		  };
		  map = new google.maps.Map(document.getElementById('map-viewport'),
		      mapOptions);
		}
		google.maps.event.addDomListener(window, 'load', initialize);
	},
	addFeedEntryView: function (entry) {
		var entrySubview = new Diveloggr.Views.FeedEntry({ model: entry });
		this.addSubview("#entry-table-elements", entrySubview);
	},

});
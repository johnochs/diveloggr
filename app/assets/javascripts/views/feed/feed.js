Diveloggr.Views.FeedView = Backbone.CompositeView.extend({
	className: "container-fluid",
	template: JST['feed/feed'],
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
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

});
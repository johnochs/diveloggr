var mapEl = $('<div id="map-canvas"></div>');
var mapOptions = {
    center: {lat: 33.397129, lng: -118.421196},
	zoom: 5,
	mapTypeId: google.maps.MapTypeId.TERRAIN,
    };
	
window.Diveloggr = {
  $mapEl: mapEl,
  map: new google.maps.Map(mapEl[0], mapOptions),
  markerHash: {},
  filterJustMe: false,
  currentBounds: {},
  looseMarkers: [],
  firstView: true,
  defaultProfileImg: "https://s3-us-west-1.amazonaws.com/diveloggrimagable/default-profile.jpg",
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  new Diveloggr.Routers.Router({ $rootEl: $("#content")});
	  Backbone.history.start();
  }
};

$(document).ready(function(){
  Diveloggr.initialize();
});

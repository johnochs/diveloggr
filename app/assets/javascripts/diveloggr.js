var mapEl = $('<div id="map-viewport"></div>');
var mapOptions = {
    center: {lat: 33.567139, lng: -97.118325},
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

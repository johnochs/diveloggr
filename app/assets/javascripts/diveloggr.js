var mapEl = $('<div id="map-viewport"></div>');
var mapOptions = {
      center: {lat: 32.837500, lng: -118.334333},
	zoom: 12
    };


window.Diveloggr = {
  $mapEl: mapEl,
  map: new google.maps.Map(mapEl[0], mapOptions),
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

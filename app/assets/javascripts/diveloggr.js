var mapEl = $('<div id="map-viewport"></div>');
var mapOptions = {
      center: {lat: 37.7533, lng: -122.452},
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

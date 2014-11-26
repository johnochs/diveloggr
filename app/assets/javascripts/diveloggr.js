window.Diveloggr = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	  new Diveloggr.Routers.Router();
	  Backbone.history.start();
  }
};

$(document).ready(function(){
  Diveloggr.initialize();
});

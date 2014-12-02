Diveloggr.Views.SplashPage = Backbone.CompositeView.extend({
	template: JST['splash/splash'],
	render: function () {
		var splashView = this.template();
		this.$el.html(splashView)
		return this;
	}
})
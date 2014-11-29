Diveloggr.Views.SplashPage = Backbone.View.extend({
	template: JST['splash/splash'],
	render: function () {
		var splashView = this.template();
		this.$el.html(splashView)
		return this;
	}
})
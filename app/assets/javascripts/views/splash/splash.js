Diveloggr.Views.SplashPage = Backbone.CompositeView.extend({
	template: JST['splash/splash'],
	className: "splash-page",
	render: function () {
		var splashView = this.template();
		this.$el.html(splashView)
		return this;
	}
})
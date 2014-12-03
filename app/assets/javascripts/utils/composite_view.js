Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render());
  },
  
  // #addGoogEL takes the wrapper returned by creating an Google event listener
  // and stores it in the googELs() array.
  addGoogEL: function (wrapper) {
	  this.googELs().push(wrapper);
  },

  attachSubview: function (selector, subview) {
    this.$(selector).append(subview.$el);
	
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function () {

    var view = this;
    _(this.subviews()).each(function (subviews, selector) {
      view.$(selector).empty();
      _(subviews).each(function (subview) {
        view.attachSubview(selector, subview);
      });
    });
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);
    _(this.subviews()).each(function (subviews) {
      _(subviews).each(function (subview) {
        subview.remove();
      });
    });
  },
  
  removeSubviews: function () {
      _(this.subviews()).each(function (subviews) {
        _(subviews).each(function (subview) {
          subview.remove();
        });
      });
  },

  removeSubview: function (selector, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subview), 1);
  },
  
  //Iterates over the array of google event listeners for the current
  //view/subview and removes them all.
  removeGoogELs: function () {
  	_(this.googELs()).each( function (googEL, i) {
  		// googEL.removeListener();
		googEL.remove();
  	})
  },

  subviews: function (selector) {

    this._subviews = this._subviews || {};

    if (!selector) {
      return this._subviews;
    } else {
      this._subviews[selector] = this._subviews[selector] || [];
      return this._subviews[selector];
    }
  },
  
  // #googELs will return and array of event listeners attached to this view.
  googELs: function () {
	  this._googELs = this._googELs || [];
	  return this._googELs;
  }
});
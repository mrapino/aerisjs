define([
  'aeris/util',
  'application/controller/layoutcontroller'
], function(_, LayoutController) {
  /**
   * Controls a toggle (~checkbox) view for a marker.
   *
   * @class aeris.builder.maps.marker.controller.MarkerToggleController
   * @extends aeris.application.controller.LayoutController
   *
   * @constructor
   * @override
   *
   * @param {aeris.builder.maps.core.model.MapObjectState} options.model Required.
   * @param {Function} options.FilterTogglesController Required.
   */
  var MarkerToggleController = function(options) {
    /**
     * Represents a set of filter toggle controls,
     * associated with our marker state model.
     *
     * @type {Function} Constructor for a Backbone.View
     * @private
     */
    this.FilterTogglesController_ = options.FilterTogglesController;


    /**
     * May define UI elements:
     *    navBtn        Toggles filter controls
     *
     * @property ui
     */
    options.ui = _.defaults(options.ui || {
      navBtn: ''
    });

    options.events || (options.events = {});
    options.events['click ' + options.ui.navBtn] = this.toggleFilterControls;


    LayoutController.call(this, options);


    this.filterToggleController_ = new this.FilterTogglesController_({
      collection: this.model.get('filters')
    });
  };
  _.inherits(MarkerToggleController, LayoutController);


  /**
   * Show filter controls.
   */
  MarkerToggleController.prototype.showFilterControls = function() {
    this.filters.show(this.filterToggleController_);
  };


  /**
   * Hide filter controls.
   */
  MarkerToggleController.prototype.hideFilterControls = function() {
    this.filters.close();
  };


  /**
   * Show or hide filter controls.
   */
  MarkerToggleController.prototype.toggleFilterControls = function() {
    var isOpen = this.filters.$el && this.filters.$el.children().length;

    if (isOpen) {
      this.hideFilterControls();
    }
    else {
      this.showFilterControls();
    }
  };


  return MarkerToggleController;
});

define([
  'aeris/util',
  'mapbuilder/markers/module/markersmodule'
], function(_, MarkersModule) {
  /**
   * Entry point for Waypoints functionality.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.module.WaypointsModule
   * @extends aeris.builder.maps.core.module.MarkersModule
   *
   * @constructor
   * @override
   *
   * @param {Backbone.View} options.menuController
  */
  var WaypointsModule = function(options) {
    /**
     * Waypoint menu view controller.
     *
     * @type {Backbone.View}
     * @private
     */
    this.menuController_ = options.menuController;


    MarkersModule.apply(this, arguments);


    // Bug Fix: Marionette gets angry
    // if we don't render this right away
    // -- not sure why.
    this.menuController_.render();

    this.addInitializer(this.renderControllers_);
  };
  _.inherits(WaypointsModule, MarkersModule);


  /**
   * Render Waypoints module controllers.
   *
   * @private
   */
  WaypointsModule.prototype.renderControllers_ = function() {
    this.eventHub_.trigger('mapControls:ready', this.menuController_, 'waypoints');
  };


  return WaypointsModule;
});

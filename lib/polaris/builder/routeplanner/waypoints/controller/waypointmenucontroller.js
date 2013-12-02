define([
  'aeris/util',
  'mapbuilder/core/controller/togglecontrolscontroller'
], function(_, ToggleControlsController) {
  /**
   * Controls the waypoints drop-down menu.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.WaypointMenuController
   * @extends aeris.builder.maps.core.controller.ToggleControlsController
   *
   * @constructor
  */
  var WaypointMenuController = function(options) {
    /**
     * Marionette UI hash.
     *
     * @type {Object.<string,string>}
     */
    this.ui = options.ui || {};

    ToggleControlsController.call(this, options);
  };
  _.inherits(WaypointMenuController, ToggleControlsController);


  /**
   * Toggle the visibility of the subMenu UI element.
   */
  WaypointMenuController.prototype.toggleSubMenu = function() {
    this.ui.subMenu.toggle();
  };


  return WaypointMenuController;
});

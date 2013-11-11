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


    /**
     * Backbone events hash.
     *
     * @type {Object.<string,string|Function>}
     */
    this.events = options.events || {};

    this.events['click'] = this.toggleSubMenu;

    ToggleControlsController.call(this, options);
  };
  _.inherits(WaypointMenuController, ToggleControlsController);


  /**
   * @override
   */
  WaypointMenuController.prototype.onRender = function() {
    this.ui.subMenu.hide();
  };


  /**
   * Toggle the visibility of the subMenu UI element.
   */
  WaypointMenuController.prototype.toggleSubMenu = function() {
    this.ui.subMenu.toggle();
  };


  return WaypointMenuController;
});

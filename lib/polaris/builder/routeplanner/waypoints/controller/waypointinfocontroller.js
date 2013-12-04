define([
  'aeris/util',
  'mapbuilder/markers/controller/markerinfocontroller',
  'aeris/util/jquery/autoheight',
  'vendor/jquery/dragEvent'
], function(_, MarkerInfoController) {
  /**
   * Controls the Waypoint details view.
   *
   * @class aeris.polaris.builder.waypoints.controller.WaypointInfoController
   * @extends aeris.builder.maps.markers.controller.MarkerInfoController
   *
   * @constructor
   * @override
   *
   * @param {Object} opt_options.ui
   */
  var WaypointInfoController = function(opt_options) {
    MarkerInfoController.call(this, opt_options);
  };
  _.inherits(WaypointInfoController, MarkerInfoController);


  return WaypointInfoController;
});

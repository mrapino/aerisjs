define([
  'aeris/util',
  'polaris/routeplanner/waypoints/controller/waypointcontroller'
], function(_, WaypointController) {
  /**
   * Controller for PublicWaypoint markers.
   *
   * @class aeris.polaris.builder.routeplanner.routedetails.controller.PublicWaypointController
   * @extends aeris.polaris.builder.routeplanner.waypoints.controller.WaypointController
   *
   * @constructor
   * @override
  */
  var PublicWaypointController = function() {
    WaypointController.apply(this, arguments);
  };
  _.inherits(PublicWaypointController, WaypointController);


  /**
   * @override
   */
  PublicWaypointController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('publicwaypoint:click', latLon, marker);
  };


  return PublicWaypointController;
});

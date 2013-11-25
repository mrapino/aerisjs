define([
  'aeris/util',
  'polaris/routeplanner/waypoints/controller/waypointcontroller',
  'polaris/maps/base/markercollections/publicwaypointmarkercollection'
], function(_, WaypointController, PublicWaypointMarkerCollection) {
  /**
   * Controls a {aeris.polaris.maps.PublicWaypointMarkers} Map Object.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.PublicWaypointController
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
  PublicWaypointController.prototype.createView_ = function() {
    var codeLookup = {
      photo: 1,
      hazard: 2,
      closure: 3,
      trailhead: 4,
      parking: 5
    };
    var type = this.model.id;
    var mapObj = new PublicWaypointMarkerCollection();

    // Query for the specified waypoint type
    var query = mapObj.getParams().get('query');
    var code = codeLookup[type];
    query.set({
      property: 'type',
      value: code + ':' + code,
      operator: 'OR'
    });

    return mapObj;
  };


  /**
   * @override
   */
  PublicWaypointController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('publicwaypoint:click', latLon, marker);
  };


  return PublicWaypointController;
});

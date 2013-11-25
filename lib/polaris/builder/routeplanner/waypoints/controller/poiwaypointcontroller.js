define([
  'aeris/util',
  'polaris/routeplanner/waypoints/controller/waypointcontroller',
  'polaris/maps/base/markercollections/poimarkercollection'
], function(_, WaypointController, POIMarkerCollection) {
  /**
   * Controls a {aeris.polaris.maps.POIMarkers} Map Object.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.POIWaypointController
   * @extends aeris.polaris.builder.routeplanner.waypoints.controller.WaypointController
   *
   * @constructor
   * @override
  */
  var POIWaypointController = function() {
    WaypointController.apply(this, arguments);
  };
  _.inherits(POIWaypointController, WaypointController);


  /**
   * @override
   */
  POIWaypointController.prototype.createView_ = function() {
    var mapObj = new POIMarkerCollection();
    var params = mapObj.getParams();
    var filtersLookup = {
      fuel: ['fuel', 'gas'],
      food: ['food'],
      medical: ['medical', 'er']
    };
    var filters = filtersLookup[this.model.id];

    // Set filters on the map object
    var filterParams = _.map(filters, function(filterName) {
      return {
        name: filterName,
        operator: 'AND'
      };
    });

    params.resetFilter(filterParams);

    return mapObj;
  };


  /**
   * @override
   */
  POIWaypointController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('waypoint:click', latLon, marker);
  };


  return POIWaypointController;
});

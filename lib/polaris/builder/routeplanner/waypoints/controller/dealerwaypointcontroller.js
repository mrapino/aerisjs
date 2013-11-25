define([
  'aeris/util',
  'polaris/routeplanner/waypoints/controller/waypointcontroller',
  'polaris/maps/base/markercollections/dealermarkercollection'
], function(_, WaypointController, DealerMarkerCollection) {
  /**
   * Controls a {aeris.polaris.maps.POIMarkers} Map Object.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.DealerWaypointController
   * @extends aeris.polaris.builder.routeplanner.waypoints.controller.WaypointController
   *
   * @constructor
   * @override
  */
  var DealerWaypointController = function() {
    WaypointController.apply(this, arguments);
  };
  _.inherits(DealerWaypointController, WaypointController);


  /**
   * @override
   */
  DealerWaypointController.prototype.createView_ = function() {
    var mapObj = new DealerMarkerCollection();
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
  DealerWaypointController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('waypoint:click', latLon, marker);
  };


  return DealerWaypointController;
});

define([
  'aeris/util',
  'mapbuilder/markers/controller/markercontroller'
], function(_, MarkerController) {
  /**
   * Waypoint {aeris.maps.MapObject} controller.
   * 
   * @class aeris.polaris.builder.routeplanner.waypoints.conroller.WaypointController
   * @extends aeris.builder.maps.markers.controller.MarkerController
   *
   * @constructor
   * @override
  */
  var WaypointController = function() {
    MarkerController.apply(this, arguments);
  };
  _.inherits(WaypointController, MarkerController);


  /**
   * Uses 'AND' filter operator.
   * The POI endpoint seems to only accept an 'AND' operator.
   *
   * @override
   */
  WaypointController.prototype.resetFilter_ = function(filters) {
    if (!this.view_) { return; }

    this.view_.getParams().resetFilter(filters, { operator: 'AND' });
  };


  /**
   * @override
   */
  WaypointController.prototype.bindMapViewEvents_ = function() {
    MarkerController.prototype.bindMapViewEvents_.apply(this, arguments);

    this.stopListening(this.map_, 'change:bounds');
    this.listenTo(this.map_, 'change:bounds', function() {
      this.view_.getParams().set('p', this.map_.get('center'), { validate: true });
    });
  };
  
  
  return WaypointController;
});

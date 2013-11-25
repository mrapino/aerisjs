define([
  'aeris/util',
  'mapbuilder/core/controller/mapobjectcollectioncontroller',
  'aeris/errors/invalidargumenterror'
], function(_, MapObjectCollectionController, InvalidArgumentError) {
  /**
   * Controls a collection of Waypoint MapObjects.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.WaypointCollectionController
   * @extends aeris.builder.maps.core.controller.MapObjectCollectionController
   *
   * @constructor
   * @override
  */
  var WaypointCollectionController = function(options) {
    this.PublicWaypointsItemView_ = options.PublicWaypointsItemView;
    this.PoiItemView_ = options.PoiItemView;
    this.DealersItemView_ = options.DealersItemView;

    MapObjectCollectionController.apply(this, arguments);
  };
  _.inherits(WaypointCollectionController, MapObjectCollectionController);


  /**
   * Choose a WaypointController based on the
   * MapObject model type.
   *
   * @override
   *
   * @param {aeris.Model} model
   * @returns {Backbone.View}
   */
  WaypointCollectionController.prototype.getItemView = function(model) {
    var publicWaypoints = ['photo', 'hazard', 'closure', 'trailhead', 'parking'];
    var poiWaypoints = ['fuel', 'food', 'medical'];
    var dealerWaypoints = ['dealers'];

    if (_.contains(publicWaypoints, model.id)) {
      return this.PublicWaypointsItemView_;
    }
    else if (_.contains(poiWaypoints, model.id)) {
      return this.PoiItemView_;
    }
    else if (_.contains(dealerWaypoints, model.id)) {
      return this.DealersItemView_;
    }

    throw new InvalidArgumentError('Unable to render waypoint: ' +
      'No item view defined for waypoint type \'' + model.id + '\'');
  };


  return WaypointCollectionController;
});

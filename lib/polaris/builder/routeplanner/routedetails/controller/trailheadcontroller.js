define([
  'aeris/util',
  'application/controller/mapobjectcontroller',
  'polaris/maps/base/markers/trailheadmarker'
], function(_, MapObjectController, TrailheadMarker) {
  /**
   * Controls the trailhead marker for our
   * trail.
   *
   * @class aeris.polaris.builder.routeplanner.routedetails.controller.TrailheadController
   * @extends aeris.application.controller.MapObjectController
   *
   * @constructor
   * @override
   *
   * @param {aeris.Model} options.trail
   * @param {Function} options.TrailheadMarker
   */
  var TrailheadController = function(options) {
    options = _.defaults(options || {}, {
      TrailheadMarker: TrailheadMarker
    });


    /**
     * The data model for our trail head marker
     * map object.
     *
     * @type {aeris.Model}
     * @private
     */
    this.trail_ = options.trail;


    /**
     * Constructor for the Marker class
     * used to create the trail head marker
     * map object.
     *
     * @type {Function} aeris.maps.Marker constructor.
     * @private
     */
    this.TrailHeadMarker_ = options.TrailheadMarker;


    MapObjectController.call(this, options);
  };
  _.inherits(TrailheadController, MapObjectController);


  /**
   * @override
   */
  TrailheadController.prototype.createView_ = function() {
    return new this.TrailHeadMarker_(undefined, {
      data: this.trail_
    })
  };


  return TrailheadController;
});

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
   * @param {aeris.Model} options.trail Required.
   * @param {Function} options.TrailheadMarker Required.
   * @param {aeris.Events} options.eventHub Required.
   */
  var TrailheadController = function(options) {
    options = _.defaults(options || {}, {
      TrailheadMarker: TrailheadMarker
    });


    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     */
    this.eventHub_ = options.eventHub;


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


  /**
   * @override
   */
  TrailheadController.prototype.onRender = function() {
    if (MapObjectController.prototype.onRender) {
      MapObjectController.prototype.onRender.apply(this, arguments);
    }

    this.listenTo(this.view_, {
      'click': this.triggerClickEvent_
    });
  };


  /**
   * @param {Array.<number>} latLon
   * @param {aeris.maps.Marker} marker
   * @private
   */
  TrailheadController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('trailhead:click', latLon, marker);
  };


  return TrailheadController;
});

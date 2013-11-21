define([
  'aeris/util',
  'application/controller/itemcontroller',
  'polaris/maps/base/markers/trailheadmarker'
], function(_, ItemController, TrailheadMarker) {
  /**
   * Controls the trailhead marker for our
   * trail.
   *
   * @class aeris.polaris.builder.routeplanner.routedetails.controller.TrailheadController
   * @extends aeris.application.controller.ItemView
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


    /**
     * The trailhead marker map object.
     *
     * @type {?aeris.maps.Marker}
     * @private
     */
    this.view_ = null;


    /**
     * The map to set on our map object view.
     *
     * @type {?aeris.maps.Map}
     * @private
     */
    this.map_ = null;


    ItemController.call(this, options);
  };
  _.inherits(TrailheadController, ItemController);


  /**
   * Render the trailhead controller
   */
  TrailheadController.prototype.render = function() {
    this.trigger('before:render');
    if (this.beforeRender) { this.beforeRender(); }

    this.view_ = new this.TrailHeadMarker_(undefined, {
      data: this.trail_
    });


    // Set the map view
    if (this.map_) {
      this.view_.setMap(this.map_);
    }

    this.trigger('render');
    if (this.onRender) { this.onRender(); }
  };


  /**
   * @public
   */
  TrailheadController.prototype.onRender = function() {
    // Bind view to map
    this.listenTo(this, {
      'map:set': function() {
        this.view_.setMap(this.map_);
      },
      'map:remove': function() {
        this.view_.setMap(null);
      }
    });
  };


  /**
   * Set the map to be used when rendering
   * the map object view.
   *
   * @param {aeris.maps.Map} map
   */
  TrailheadController.prototype.setMap = function(map) {
    this.map_ = map;

    if (map) {
      this.trigger('map:set');
    } else {
      this.trigger('map:remove');
    }
  };


  /**
   * Close the trailhead view.
   */
  TrailheadController.prototype.close = function() {
    this.view_.setMap(null);
    this.stopListening();
  };


  return TrailheadController;
});

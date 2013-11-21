define([
  'aeris/util',
  'mapbuilder/core/controller/mapobjectcontroller',
  'aeris/errors/apiresponseerror'
], function(_, MapObjectController, ApiResponseError) {
  /**
   * Controls an aeris.polaris.maps.polylines.TrailPolyline.
   * 
   * @class aeris.polaris.builder.routeplanner.routedetails.controller.TrailController
   * @extends aeris.builder.maps.core.controller.MapObjectController
   *
   * @constructor
   * @override
   *
   * @param {string=} options.trailId
   * @param {Object=} options.style
   * @param {aeris.Model} options.trail
  */
  var TrailController = function(options) {
    options = _.defaults(options || {}, {
      style: {}
    });


    /**
     * The trail data model.
     *
     * @type {aeris.Model}
     * @private
     */
    this.trail_ = options.trail;


    /**
     * Styles to apply to the TrailPolyline MapObject
     *
     * @type {Object}
     * @private
     */
    this.style_ = options.style;


    MapObjectController.apply(this, arguments);
  };
  _.inherits(TrailController, MapObjectController);


  /**
   * @override
   */
  TrailController.prototype.createView_ = function(TrailPolyline) {
    return new TrailPolyline(this.style_, {
      data: this.trail_
    });
  };


  /**
   * @param {Object} style
   */
  TrailController.prototype.setStyle = function(style) {
    this.style_ = style;
  };


  /**
   * @override
   */
  TrailController.prototype.onRender = function() {
    if (MapObjectController.prototype.onRender) {
      MapObjectController.prototype.onRender.apply(this, arguments);
    }

    // Zoom to trail
    // when trail data is fetched
    this.listenTo(this.view_.getData(), 'sync', this.zoomToTrail_);
  };


  /**
   * Zoom the map so that the trail fills
   * the map viewport.
   *
   * @private
   */
  TrailController.prototype.zoomToTrail_ = function() {
    var bounds = this.view_.get('bounds');
    this.appState_.get('map').fitToBounds(bounds);
  };

  
  return TrailController;
});
define([
  'aeris/util',
  'mapbuilder/core/controller/mapobjectcontroller',
  'polaris/api/endpoint/model/trail',
  'aeris/errors/apiresponseerror'
], function(_, MapObjectController, Trail, ApiResponseError) {
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
   * @param {Function=} options.Trail
  */
  var TrailController = function(options) {
    options = _.defaults(options || {}, {
      trailId: '',
      style: {},
      Trail: Trail
    });

    /**
     * The id the trail, as referenced
     * by the Polaris PublicTrails API.
     *
     * @type {string}
     * @private
     */
    this.trailId_ = options.trailId;


    /**
     * Styles to apply to the TrailPolyline MapObject
     *
     * @type {Object}
     * @private
     */
    this.style_ = options.style;


    /**
     * Constructor for Trail data model.
     *
     * @type {Function=}
     * @private
     */
    this.Trail_ = options.Trail;


    MapObjectController.apply(this, arguments);
  };
  _.inherits(TrailController, MapObjectController);


  /**
   * @override
   */
  TrailController.prototype.createView_ = function(TrailPolyline) {
    var dataModel = new this.Trail_({
      id: this.trailId_
    });

    return new TrailPolyline(this.style_, {
      data: dataModel
    });
  };


  /**
   * @param {string} id
   */
  TrailController.prototype.setTrailId = function(id) {
    this.trailId_ = id;
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

    // Fetch trail data
    this.view_.fetchData().
      fail(function(e) {
        throw new ApiResponseError(e.description);
      });
  };
  
  return TrailController;
});

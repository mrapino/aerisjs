define([
  'aeris/util',
  'aeris/application/controllers/itemcontroller',
  'aeris/errors/unimplementedmethoderror'
], function(_, ItemController, UnimplementedMethodError) {
  /**
   * Controls a {aeris.maps.extensions.MapObjectInterface} view.
   *
   * @class MapObjectController
   * @namespace aeris.application.controllers
   * @extends aeris.application.controllers.ItemController
   *
   * @abstract
   *
   * @constructor
   * @override
   *
   * @param {?aeris.maps.Map} opt_options.map
   * @param {?aeris.maps.extensions.MapObjectInterface} opt_options.view
  */
  var MapObjectController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      map: null,
      view: null
    });


    /**
     * The map object view.
     *
     * @type {?aeris.maps.extensions.MapObjectInterface}
     * @protected
     * @property view_
     */
    this.view_ = options.view;


    /**
     * The map to set on our map object view.
     *
     * @type {?aeris.maps.Map}
     * @protected
     * @property map_
     */
    this.map_ = options.map;


    ItemController.apply(this, arguments);
  };
  _.inherits(MapObjectController, ItemController);


  /**
   * Create the MapObject view,
   * and set it to the map.
   * @method render
   */
  MapObjectController.prototype.render = function() {
    this.trigger('before:render');
    if (this.beforeRender) { this.beforeRender(); }

    if (!this.view_) {
      this.view_ = this.createView_();
    }

    // Set the map view
    if (this.map_) {
      this.view_.setMap(this.map_);
    }

    this.bindViewToMap_();

    this.trigger('render');
    if (this.onRender) { this.onRender(); }
  };


  /**
   * @abstract
   * @protected
   * @return {aeris.maps.extensions.MapObjectInterface}
   * @method createView_
   */
  MapObjectController.prototype.createView_ = function() {
    throw new UnimplementedMethodError('Abstract method \'createView_\' must be defined.');
  };


  /**
   * Set our map on our view.
   *
   * @private
   * @method bindViewToMap_
   */
  MapObjectController.prototype.bindViewToMap_ = function() {
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
   * @method setMap
   */
  MapObjectController.prototype.setMap = function(map) {
    this.map_ = map;

    if (map) {
      this.trigger('map:set');
    } else {
      this.trigger('map:remove');
    }
  };


  /**
   * Shut 'er down.
   * @method close
   */
  MapObjectController.prototype.close = function() {
    this.trigger('before:close');
    if (this.onBeforeClose) { this.onBeforeClose(); }

    this.view_.setMap(null);
    this.stopListening();

    this.trigger('close');
    if (this.onClose) { this.onClose(); }
  };


  return MapObjectController;
});

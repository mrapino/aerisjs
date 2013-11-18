define([
  'aeris/util',
  'aeris/viewcollection',
  'polaris/maps/base/polylines/trailpolyline',
  'polaris/api/endpoint/collection/trailcollection'
], function(_, ViewCollection, TrailPolyline, TrailCollection) {
  /**
   * A collectin of polyline MapObject views.
   *
   * @class aeris.polaris.maps.polyline.TrailPolylineCollection
   * @extends aeris.ViewCollection
   *
   * @implements aeris.maps.MapObjectInterface
   *
   * @constructor
   * @override
  */
  var TrailPolylineCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      model: TrailPolyline
    });

    options.data || (options.data = new TrailCollection());

    ViewCollection.call(this, opt_models, opt_options);
  };
  _.inherits(TrailPolylineCollection, ViewCollection);


  /**
   * @override
   */
  TrailPolylineCollection.prototype.setMap = function(map) {
    var topic = map ? 'map:set' : 'map:remove';

    this.map_ = map;

    this.invoke('setMap', map);

    this.trigger(topic, this, map);
  };


  /**
   * @override
   */
  TrailPolylineCollection.prototype.getMap = function() {
    return this.map_;
  };


  /**
   * @override
   * @returns {boolean}
   */
  TrailPolylineCollection.prototype.hasMap = function() {
    return !!this.map_;
  };


  /**
   * Create child models with the
   * collection's map.
   *
   * @override
   */
  TrailPolylineCollection.prototype._prepareModel = function(opt_attrs, opt_options) {
    var attrs = opt_attrs || {};

    attrs.map = this.map_

    ViewCollection.prototype._prepareModel.call(this, attrs,  opt_options);
  };


  return TrailPolylineCollection;
});

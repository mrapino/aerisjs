define([
  'aeris/util',
  'base/extension/mapobjectcollection',
  'polaris/maps/base/polylines/trailpolyline',
  'polaris/api/endpoint/collection/trailcollection'
], function(_, MapObjectCollection, TrailPolyline, TrailCollection) {
  /**
   * A collectin of polyline MapObject views.
   *
   * @class aeris.polaris.maps.polyline.TrailPolylineCollection
   * @extends aeris.maps.extension.MapObjectCollection
   *
   * @constructor
   * @override
  */
  var TrailPolylineCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      model: TrailPolyline
    });

    options.data || (options.data = new TrailCollection());

    MapObjectCollection.call(this, opt_models, options);
  };
  _.inherits(TrailPolylineCollection, MapObjectCollection);


  return TrailPolylineCollection;
});

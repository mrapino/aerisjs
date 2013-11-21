define([
  'aeris/util',
  'base/polylines/polyline',
  'polaris/api/endpoint/model/trail'
], function(_, Polyline, Trail) {
  /**
   * A polyline MapObject representing a trail
   * from the Polaris Public Trails API.
   *
   * Acts as a View-Model for the {aeris.polaris.api.endpoint.model.Trail}
   * data model.
   *
   * @class aeris.polaris.maps.polylines.TrailPolyline
   * @extends aeris.ViewModel
   *
   * @constructor
   * @override
  */
  var TrailPolyline = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      attributeTransforms: {
        path: function() {
          var routeSegments = this.getDataAttribute('routesegments');

          if (!routeSegments) { return this.get('path'); }

          return _.map(routeSegments[0].routepoints, function(point) {
            return [point.loc.lat, point.loc.lon];
          }, this)
        },
        bounds: function() {
          var boundingBox = this.getDataAttribute('boundingbox');

          if (!boundingBox) { return this.get('bounds'); }

          return [
            [boundingBox.minloc.lat, boundingBox.minloc.lon],
            [boundingBox.maxloc.lat, boundingBox.maxloc.lon]
          ]
        }
      }
    });

    options.data || (options.data = new Trail());


    /**
     * Bounds of the polyline.
     *
     * @attribute bounds
     * @type {Array.<Array.<number>>|undefined}
     */


    Polyline.call(this, opt_attrs, options);
  };
  _.inherits(TrailPolyline, Polyline);


  return _.expose(TrailPolyline, 'aeris.polaris.maps.polylines.TrailPolyline');
});
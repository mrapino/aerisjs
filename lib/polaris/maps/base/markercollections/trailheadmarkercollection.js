define([
  'aeris/util',
  'base/markercollections/pointdatamarkercollection',
  'polaris/api/endpoint/collection/trailheadcollection',
  'polaris/maps/base/markers/trailheadmarker'
], function(_, PointDataMarkerCollection, TrailheadCollection, TrailheadMarker) {
  /**
   * Markers for {aeris.polaris.api.endpoint.model.Trailhead}
   * point data.
   *
   * @class aeris.polaris.maps.TrailheadMarkers
   * @extends aeris.maps.markercollections.PointDataMarkerCollection
   *
   * @constructor
   * @override
  */
  var TrailheadMarkers = function(opt_markers, opt_options) {
    var options = _.defaults(opt_options || {}, {
      data: new TrailheadCollection(),
      model: TrailheadMarker
    });


    PointDataMarkerCollection.call(this, opt_markers, options);
  };
  _.inherits(TrailheadMarkers, PointDataMarkerCollection);


  return _.expose(TrailheadMarkers, 'aeris.polaris.maps.TrailheadMarkers');
});

define([
  'aeris/util',
  'base/markercollections/pointdatamarkercollection',
  'polaris/api/endpoint/collection/dealercollection',
  'polaris/maps/base/markers/dealermarker'
], function(_, PointDataMarkerCollection, DealerCollection, DealerMarker) {
  /**
   * @class polaris.maps.DealerMarkers
   * @extends aeris.maps.markercollections.PointDataMarkerCollection
   */
  var DealerMarkerCollection = function(opt_markers, opt_options) {
    var options = _.extend({
      data: new DealerCollection(),
      marker: DealerMarker
    }, opt_options);

    PointDataMarkerCollection.call(this, opt_markers, options);
  };
  _.inherits(DealerMarkerCollection, PointDataMarkerCollection);


  return _.expose(DealerMarkerCollection, 'aeris.polaris.maps.DealerMarkers');
});

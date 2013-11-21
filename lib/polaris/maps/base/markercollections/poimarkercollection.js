define([
  'aeris/util',
  'base/markercollections/pointdatamarkercollection',
  'polaris/api/endpoint/collection/poicollection',
  'polaris/maps/base/markers/poimarker',
  'polaris/maps/base/markercollections/config/clusterstyles'
], function(_, PointDataMarkerCollection, POICollection, POIMarker, clusterStyles) {
  /**
   * @class aeris.polaris.maps.POIMarkers
   * @extends aeris.maps.markercollections.PointDataMarkerCollection
   */
  var POIMarkerCollection = function(opt_markers, opt_options) {
    var options = _.extend({
      data: new POICollection(),
      model: POIMarker,
      clusterStyles: clusterStyles.poi
    }, opt_options);

    PointDataMarkerCollection.call(this, opt_markers, options);
  };
  _.inherits(POIMarkerCollection, PointDataMarkerCollection);


  return _.expose(POIMarkerCollection, 'aeris.polaris.maps.POIMarkers');
});

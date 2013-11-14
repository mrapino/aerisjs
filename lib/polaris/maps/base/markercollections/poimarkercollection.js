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
      marker: POIMarker,
      clusterStyles: clusterStyles.poi
    }, opt_options);

    PointDataMarkerCollection.call(this, opt_markers, options);

    // Override map event bindings,
    // to base API request on the map `center` attribute,
    // instead of the `bounds` attribute
    this.mapEvents_['change:center'] = function() {
      this.data_.getParams().set('p', this.getMap().get('center'), { validate: true });
    };
    delete this.mapEvents_['change:bounds'];
  };
  _.inherits(POIMarkerCollection, PointDataMarkerCollection);


  return _.expose(POIMarkerCollection, 'aeris.polaris.maps.POIMarkers');
});

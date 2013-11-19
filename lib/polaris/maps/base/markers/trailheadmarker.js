define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker'
], function(_, config, PointDataMarker) {
  /**
   * @class aeris.polaris.maps.markers.TrailheadMarker
   * @extends aeris.maps.markers.PointDataMarker
   *
   * @constructor
   * @override
  */
  var TrailheadMarker = function(opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      url: config.get('path') + 'assets/polaris/markers/small/trailhead.png'
    });

    PointDataMarker.call(this, attrs, opt_options);
  };
  _.inherits(TrailheadMarker, PointDataMarker);


  /**
   * @override
   */
  TrailheadMarker.prototype.getTitleFromData_ = function() {
    return this.get('data').get('name');
  };


  return TrailheadMarker;
});

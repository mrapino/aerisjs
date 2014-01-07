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
  TrailheadMarker.prototype.lookupTitle_ = function() {
    return this.getDataAttribute('name') || this.get('title');
  };


  /**
   * @override
   */
  TrailheadMarker.prototype.lookupPosition_ = function() {
    var trailhead = this.getDataAttribute('trailhead');

    if (!trailhead) { return this.get('position'); }

    return [
      trailhead.loc.lat,
      trailhead.loc.lon
    ]
  };


  return TrailheadMarker;
});
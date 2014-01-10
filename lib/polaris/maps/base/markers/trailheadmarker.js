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
    /** @attribute {string} location */
    /** @attribute {?number} trailDistance In kilometers. */

    var attrs = _.defaults(opt_attrs || {}, {
      url: config.get('path') + 'assets/polaris/markers/small/trailhead.png',
      offsetX: 12,
      offsetY: 36,
      location: '',
      trailDistance: null
    });

    var options = _.defaults(opt_options || {}, {
      attributeTransforms: { }
    });

    _.defaults(options.attributeTransforms, {
      location: this.lookupLocation_,
      trailDistance: this.lookupTrailDistance_
    })

    PointDataMarker.call(this, attrs, options);
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


  /** @private */
  TrailheadMarker.prototype.lookupLocation_ = function() {
    if (!this.getDataAttribute('place')) { return this.get('place'); }

    return this.getDataAttribute('place.name') + ', '
      + this.getDataAttribute('place.state');
  }


  TrailheadMarker.prototype.lookupTrailDistance_ = function() {
    if (!this.getDataAttribute('distance')) { return this.get('distance'); }

    return this.getDataAttribute('distance');
  };


  return TrailheadMarker;
});

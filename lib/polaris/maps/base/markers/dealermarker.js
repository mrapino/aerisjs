define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker',
  'polaris/maps/base/markers/config/iconlookup'
], function(_, config, PointDataMarker, iconLookup) {
  /**
   * @class polaris.maps.markers.DealerMarker
   * @extends aeris.maps.markers.PointDataMarker
   */
  var DealerMarker = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      url: config.get('path') + 'assets/poi.png'
    }, opt_attrs);

    var options = _.extend({
      iconPath: config.get('path') + 'assets/polaris/markers/small/{name}.png',
      iconLookup: iconLookup.dealer,
      typeAttribute: 'service.type'
    }, opt_options);

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(DealerMarker, PointDataMarker);


  /**
   * @override
   */
  DealerMarker.prototype.lookupTitle_ = function() {
    return this.getDataAttribute('service.name') || this.get('title');
  };


  return DealerMarker;
});

define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker'
], function(_, config, PointDataMarker) {
  /**
   * @class polaris.maps.markers.DealerMarker
   * @extends aeris.maps.markers.PointDataMarker
   */
  var DealerMarker = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      url: config.get('path') + 'assets/poi.png'
    }, opt_attrs);

    var options = _.extend({
      iconPath: config.get('path') + 'assets/polaris-mocks/{name}.png',
      iconLookup: {
        orv: 'rzr-logo',
        vic: 'vehicle-city-motorsports-victory',
        sno: 'icon_polaris',
        ind: 'logo-motorcycle-Indian-2'
      },
      iconTypeAttribute: 'service.type'
    }, opt_options);

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(DealerMarker, PointDataMarker);


  return DealerMarker;
});

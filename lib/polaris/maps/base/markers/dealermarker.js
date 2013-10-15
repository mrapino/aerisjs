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
      iconPath: config.get('path') + 'assets/polaris-mocks/{name}',
      iconLookup: {
        orv: 'rzr-logo.png',
        vic: 'vehicle-city-motorsports-victory.png',
        sno: 'icon_polaris.png',
        ind: 'logo-motorcycle-Indian-2.gif'
      },
      iconTypeAttribute: 'service.type'
    }, opt_options);

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(DealerMarker, PointDataMarker);


  return DealerMarker;
});

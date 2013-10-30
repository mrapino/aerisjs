define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker'
], function(_, config, PointDataMarker) {
  /**
   * @class polaris.maps.markers.POIMarker
   * @extends aeris.maps.markers.PointDataMarker
   */
  var POIMarker = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      url: config.get('path') + 'assets/poi.png'
    }, opt_attrs);

    var options = _.extend({
      iconPath: config.get('path') + 'assets/polaris-mocks/{name}.png',
      iconLookup: {
        gas: 'City-Gas-station-icon',
        fuel: 'City-Gas-station-icon',
        lodging: 'City-Hotel-icon',
        hotel: 'City-Hotel-icon',
        food: 'Catering-Restaurant-icon',
        medical: 'hospital-icon',
        er: 'hospital-icon',
        hospital: 'hospital-icon'
      },
      iconTypeAttribute: 'type'
    }, opt_options);

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(POIMarker, PointDataMarker);


  return POIMarker;
});
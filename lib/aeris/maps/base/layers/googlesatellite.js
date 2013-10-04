define(['aeris/util', 'base/layers/googlemaptype'], function(_, GoogleMapType) {
  /**
   * Representation of Google's Satellite.
   *
   * @constructor
   * @class aeris.maps.layers.GoogleSatellite
   * @extends {aeris.maps.layers.GoogleMapType}
   */
  var GoogleSatellite = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      mapTypeId: 'SATELLITE',
      name: 'GoogleSatellite'
    }, opt_attrs);


    GoogleMapType.call(this, attrs, opt_options);
  };
  _.inherits(GoogleSatellite, GoogleMapType);


  return _.expose(GoogleSatellite, 'aeris.maps.layers.GoogleSatellite');

});

define([
  'aeris/util', './click', 'base/eventstrategies/mixins/aerisweatherdetailsclick'
], function(_) {

  /**
   * @fileoverview Aeris Weather Details click strategy for Google Maps.
   */


  _.provide('aeris.maps.gmaps.eventstrategies.AerisWeatherDetailsClick');


  /**
   * A strategy for support of an Aeris Weather Details click for Google Maps.
   *
   * @constructor
   * @extends {aeris.maps.gmaps.eventstrategies.Click}
   * @extends {aeris.maps.eventstrategies.mixins.AerisWeatherDetailsClick}
   */
  aeris.maps.gmaps.eventstrategies.AerisWeatherDetailsClick = function() {
    aeris.maps.gmaps.eventstrategies.Click.call(this);
  };
  _.inherits(aeris.maps.gmaps.eventstrategies.AerisWeatherDetailsClick,
                 aeris.maps.gmaps.eventstrategies.Click);
  _.extend(
    aeris.maps.gmaps.eventstrategies.AerisWeatherDetailsClick.prototype,
    aeris.maps.eventstrategies.mixins.AerisWeatherDetailsClick);


  return aeris.maps.gmaps.eventstrategies.AerisWeatherDetailsClick;

});

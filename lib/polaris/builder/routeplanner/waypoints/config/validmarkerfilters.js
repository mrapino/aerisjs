define([
  'polaris/api/endpoint/config/validfilters'
], function(validFilters) {
  /**
   * Returns validFilters, mapped to marker class names.
   * As:
   *  {
   *    'MarkersClassName': [
   *      'filterNameA',
   *      'filterNameB',
   *      ...
   *    ],
   *    ...
   *  }
   *
   * @class aeris.polarisbuilder.maps.waypoints.config.validMarkerFilters
   * @static
   */
  return {
    POIMarkers: validFilters.poi,
    DealerMarkers: validFilters.dealers,
    FuelMarkers: ['fuel', 'gas'],
    MedicalMarkers: ['medical', 'er'],
    RestaurantMarkers: ['food']
  };
});

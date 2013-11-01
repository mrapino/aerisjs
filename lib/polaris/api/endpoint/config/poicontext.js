define([
  'aeris/util',
  'api/endpoint/config/pointdatacontext',
  'polaris/api/endpoint/config/validfilters'
], function(_, DateHelper, pointDataContext, validFilters) {
  /**
   * Wired dependency spec for {aeris.polaris.api.endpoint.collection.POICollection}
   *
   * @class aeris.polaris.api.endpoint.config.poiContext
   * @extends aeris.api.endpoint.config.pointDataContext
   */
  return _.extend({}, pointDataContext, {
    defaultParams: {
      limit: 100,
      radius: 60,
      p: null           // Place must be provided
    },

    validFilters: validFilters.poi,

    endpoint: 'places/poi',
    action: 'within'
  });
});

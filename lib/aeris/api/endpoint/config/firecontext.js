define([
  'aeris/util',
  'api/endpoint/config/pointdatacontext'
], function(_, pointDataContext) {
  /**
   * Wired dependency spec for {aeris.api.endpoint.collection.FireCollection}
   * extends {aeris.api.endpoint.config.pointDataContext}
   *
   * @property aeris.api.endpoint.config.earthquakeContext
   * @type {Object} WireJS spec
   */
  return _.extend({}, pointDataContext, {
    defaultParams: {
      limit: 500,
      query: 'type:L'
    },

    validFilters: [
      'large',
      'critical',
      'modis'
    ],

    model: { module: 'api/endpoint/model/fire' },
    endpoint: 'fires',
    action: 'search'
  });
});
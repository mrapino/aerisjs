define([
  'aeris/util',
  'api/endpoint/config/pointdatacontext',
  'polaris/api/endpoint/config/validfilters'
], function(_, DateHelper, pointDataContext, validFilters) {
  /**
   * Wired dependency spec for {aeris.polaris.api.endpoint.collection.DealerCollection}
   *
   * @class aeris.polaris.api.endpoint.config.dealerContext
   * @extends aeris.api.endpoint.config.pointDataContext
   */
  return _.extend({}, pointDataContext, {
    defaultParams: {
      limit: 100
    },

    validFilters: validFilters.dealers,

    endpoint: 'polaris/dealers',
    action: 'within'
  });
});

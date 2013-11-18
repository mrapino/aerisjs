define([
  'aeris/util',
  'api/endpoint/collection/aerisapicollection',
  'polaris/api/endpoint/model/trail'
], function(_, AerisApiCollection, Trail) {
  /**
   * A collection of public trail paths
   * from the Polaris publictrails API.
   *
   * @class aeris.polaris.api.endpoint.collection.TrailCollection
   * @extends aeris.api.endpoint.collection.AerisApiCollection
   *
   * @constructor
   * @override
  */
  var TrailCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: 'polaris/publictrails',
      action: 'within',
      params: {
        fields: [
          'id',
          'name',
          'description',
          'routesegments',
          'distance'
        ],
        bounds: [52.37, -135.52, 22.43, -55.016],      // USA
        limit: 100
      },
      model: Trail
    });

    AerisApiCollection.call(this, opt_models, options);
  };
  _.inherits(TrailCollection, AerisApiCollection);


  return TrailCollection;
});

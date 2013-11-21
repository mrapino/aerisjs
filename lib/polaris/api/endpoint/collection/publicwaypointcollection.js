define([
  'aeris/util',
  'api/endpoint/collection/aerisapicollection'
], function(_, AerisApiCollection) {
  /**
   * A collection of data objects
   * from the Polaris Public Trails API.
   *
   * @class aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   * @extends aeris.api.endpoint.collection.AerisApiCollection
   *
   * @constructor
   * @override
  */
  var PublicWaypointCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: 'polaris/publicwaypoints',
      action: 'search',
      params: {
        limit: 250
      }
    });

    AerisApiCollection.call(this, opt_models, options);
  };
  _.inherits(PublicWaypointCollection, AerisApiCollection);


  return PublicWaypointCollection;
});

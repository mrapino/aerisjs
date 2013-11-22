define([
  'aeris/util',
  'api/endpoint/collection/aerisapicollection',
  'polaris/api/endpoint/model/publicwaypoint'
], function(_, AerisApiCollection, PublicWaypoint) {
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
      model: PublicWaypoint,
      endpoint: 'polaris/publicwaypoints',
      action: 'within',
      params: {
        limit: 250
      }
    });

    AerisApiCollection.call(this, opt_models, options);
  };
  _.inherits(PublicWaypointCollection, AerisApiCollection);


  return _.expose(PublicWaypointCollection, 'aeris.polaris.api.endpoint.PublicWaypointCollection');
});

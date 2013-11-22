define([
  'aeris/util',
  'polaris/api/collection/publicwaypointcollection',
  'aeris/api/params/collection/chainedquery'
], function (_, PublicWaypointCollection, ChainedQuery) {
  /**
   * A collection of public waypoints, of type 'Closure'
   *
   * @class aeris.polaris.api.endpoint.collection.ClosureWaypointCollection
   * @extends aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   *
   * @constructor
   * @override
   */
  var ClosureWaypointCollection = function (opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      query: new ChainedQuery([
        {
          property: 'type',
          value: '3:3',
          operator: 'AND'
        }
      ])
    });

    PublicWaypointCollection.call(this, opt_models, options);
  };
  _.inherits(ClosureWaypointCollection, PublicWaypointCollection);


  return _.expose(ClosureWaypointCollection, 'aeris.polaris.api.endpoint.ClosureWaypointCollection');
});

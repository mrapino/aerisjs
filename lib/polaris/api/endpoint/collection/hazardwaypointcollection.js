define([
  'aeris/util',
  'polaris/api/collection/publicwaypointcollection',
  'aeris/api/params/collection/chainedquery'
], function (_, PublicWaypointCollection, ChainedQuery) {
  /**
   * A collection of public waypoints, of type 'Hazard'
   *
   * @class aeris.polaris.api.endpoint.collection.HazardWaypointCollection
   * @extends aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   *
   * @constructor
   * @override
   */
  var HazardWaypointCollection = function (opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      query: new ChainedQuery([
        {
          property: 'type',
          value: '2:2',
          operator: 'AND'
        }
      ])
    });

    PublicWaypointCollection.call(this, opt_models, options);
  };
  _.inherits(HazardWaypointCollection, PublicWaypointCollection);


  return _.expose(HazardWaypointCollection, 'aeris.polaris.api.endpoint.HazardWaypointCollection');
});

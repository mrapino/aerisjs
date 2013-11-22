define([
  'aeris/util',
  'polaris/api/collection/publicwaypointcollection',
  'aeris/api/params/collection/chainedquery'
], function (_, PublicWaypointCollection, ChainedQuery) {
  /**
   * A collection of public waypoints, of type 'Parking'
   *
   * @class aeris.polaris.api.endpoint.collection.ParkingWaypointCollection
   * @extends aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   *
   * @constructor
   * @override
   */
  var ParkingWaypointCollection = function (opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      query: new ChainedQuery([
        {
          property: 'type',
          value: '5:5',
          operator: 'AND'
        }
      ])
    });

    PublicWaypointCollection.call(this, opt_models, options);
  };
  _.inherits(ParkingWaypointCollection, PublicWaypointCollection);


  return _.expose(ParkingWaypointCollection, 'aeris.polaris.api.endpoint.ParkingWaypointCollection');
});

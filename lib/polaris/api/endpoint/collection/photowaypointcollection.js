define([
  'aeris/util',
  'polaris/api/collection/publicwaypointcollection',
  'aeris/api/params/collection/chainedquery'
], function(_, PublicWaypointCollection, ChainedQuery) {
  /**
   * A collection of public waypoints, of type 'photo.'
   *
   * @class aeris.polaris.api.endpoint.collection.PhotoWaypointCollection
   * @extends aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   *
   * @constructor
   * @override
  */
  var PhotoWaypointCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      query: new ChainedQuery([{
        property: 'type',
        value: '1:1',
        operator: 'AND'
      }])
    });

    PublicWaypointCollection.call(this, opt_models, options);
  };
  _.inherits(PhotoWaypointCollection, PublicWaypointCollection);


  return _.expose(PhotoWaypointCollection, 'aeris.polaris.api.endpoint.PhotoWaypointCollection');
});

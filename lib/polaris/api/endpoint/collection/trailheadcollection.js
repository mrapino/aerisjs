define([
  'aeris/util',
  'api/endpoint/collection/pointdatacollection',
  'polaris/api/endpoint/model/trailhead'
], function(_, PointDataCollection, Trailhead) {
  /**
   * A collection of public trail trailheads
   * from the Polaris publictrails API.
   *
   * @class aeris.polaris.api.endpoint.collection.TrailheadCollection
   * @extends aeris.api.endpoint.collection.PointDataCollection
   *
   * @constructor
   * @override
  */
  var TrailheadCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      endpoint: 'polaris/publictrails',
      action: 'within',
      params: {
        fields: [
          'id',
          'name',
          'description',
          'trailhead'
        ]
      },
      model: Trailhead
    });

    PointDataCollection.call(this, opt_models, options);
  };
  _.inherits(TrailheadCollection, PointDataCollection);


  return TrailheadCollection;
});

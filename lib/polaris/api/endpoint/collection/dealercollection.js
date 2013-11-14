define([
  'aeris/util',
  'api/endpoint/collection/pointdatacollection'
], function(_, PointDataCollection) {
  /**
   * @class polaris.api.collection.DealerCollection
   * @extends aeris.api.collection.PointDataCollection
   * @constructor
   */
  var DealerCollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      params: {
        limit: 100
      },
      endpoint: 'polaris/dealers',
      action: 'within'
    });

    PointDataCollection.call(this, opt_models, options);
  };
  _.inherits(DealerCollection, PointDataCollection);


  return DealerCollection;
});

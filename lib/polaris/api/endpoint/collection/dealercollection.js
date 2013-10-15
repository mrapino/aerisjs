define([
  'aeris/util',
  'api/endpoint/collection/pointdatacollection'
], function(_, PointDataCollection) {
  /**
   * @class polaris.api.collection.DealerCollection
   * @extends aeris.api.collection.PointDataCollection
   * @constructor
   */
  var DealerCollection = function(opt_attrs, opt_options) {
    var options = _.extend({
      endpoint: 'polaris/dealers',
      action: 'within',
      params: {
        limit: 100
      }
    }, opt_options);

    PointDataCollection.call(this, opt_attrs, options);
  };
  _.inherits(DealerCollection, PointDataCollection);


  return DealerCollection;
});

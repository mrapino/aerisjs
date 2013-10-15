define([
  'aeris/util',
  'api/endpoint/collection/pointdatacollection'
], function(_, PointDataCollection) {
  /**
   * @class polaris.api.collection.POICollection
   * @extends aeris.api.collection.PointDataCollection
   * @constructor
   */
  var POICollection = function(opt_attrs, opt_options) {
    var options = _.extend({
      endpoint: 'places/poi',
      action: 'within',
      params: {
        limit: 100,
        radius: 60,
        p: null       // Place must be provided
      }
    }, opt_options);

    PointDataCollection.call(this, opt_attrs, options);
  };
  _.inherits(POICollection, PointDataCollection);


  return POICollection;
});

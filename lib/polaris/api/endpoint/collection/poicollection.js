define([
  'aeris/util',
  'api/endpoint/collection/pointdatacollection'
], function(_, PointDataCollection) {
  /**
   * @class polaris.api.collection.POICollection
   * @extends aeris.api.collection.PointDataCollection
   * @constructor
   */
  var POICollection = function(opt_models, opt_options) {
    var options = _.defaults(opt_options || {}, {
      params: {
        limit: 100,
        radius: 60,
        p: null           // Place must be provided
      },
      endpoint: 'places/poi',
      action: 'within'
    });

    PointDataCollection.call(this, opt_models, options);
  };
  _.inherits(POICollection, PointDataCollection);


  return POICollection;
});

define([
  'aeris/util',
  'api/endpoint/model/pointdata',
  'errors/apiresponseerror'
], function(_, PointData) {
  /**
   * A public trail trailhead (point data)
   * from the polaris publictrails API.
   *
   * @class aeris.polaris.api.endpoint.model.TrailHead
   * @extends aeris.api.endpoint.model.PointData
   *
   * @constructor
   * @override
  */
  var TrailHead = function() {
    PointData.apply(this, arguments);
  };
  _.inherits(TrailHead, PointData);


  return TrailHead;
});

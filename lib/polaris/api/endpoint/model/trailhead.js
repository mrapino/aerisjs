define([
  'aeris/util',
  'api/endpoint/model/pointdata',
  'aeris/errors/apiresponseerror'
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


  /**
   * @override
   */
  TrailHead.prototype.parse = function(res) {
    var trailhead = res.trailhead;
    
    if (!trailhead || !trailhead.loc ||
      !trailhead.loc.lat || !trailhead.loc.lon
    ) {
      throw new APIResponseErrror('Missing trailhead location data');
    }

    return _.extend({}, res, {
      latLon: [trailhead.loc.lat, trailhead.loc.lon]
    });
  };


  return TrailHead;
});

define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker',
  'polaris/api/endpoint/model/publicwaypoint'
], function(_, config, PointDataMarker, PublicWaypoint) {
  /**
   * A marker representing an aeris.polaris.api.endpoint.model.PublicWaypoint
   * data model.
   *
   * @class aeris.polaris.maps.markers.PublicWaypointMarker
   * @extends aeris.maps.markers.PointDataMarker
   *
   * @constructor
   * @override
  */
  var PublicWaypointMarker = function(opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      url: config.get('path') + 'assets/polaris/markers/small/ride.png'
    });

    var options = _.defaults(opt_options || {}, {
      typeAttribute: 'type',
      iconPath: config.get('path') + 'assets/polaris/markers/small/{name}.png',
      iconLookup: {
        1: 'photo',     // Scenic
        2: 'hazard',    // Hazard
        3: 'closure',   // Closure
        4: 'trailhead', // trailhead
        5: 'parking'    // parking
      }
    });

    // Default data model
    options.data || (options.data = new PublicWaypoint());

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(PublicWaypointMarker, PointDataMarker);


  /**
   * @override
   */
  PublicWaypointMarker.prototype.lookupTitle_ = function() {
    return this.getDataAttribute('name') || this.get('title');
  };


  return PublicWaypointMarker;
});

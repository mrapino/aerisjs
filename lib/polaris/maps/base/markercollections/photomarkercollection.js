define([
  'aeris/util',
  'polaris/maps/base/markercollections/publicwaypointmarkercollection',
  'polaris/api/endpoint/collection/publicwaypointcollection'
], function(_, PublicWaypointMarkers, PublicWaypointCollection) {
  /**
   * A collection of Photo-type Waypoint markers.
   *
   * @class aeris.polaris.maps.PhotoMarkers
   * @extends aeris.polaris.maps.PublicWaypointMarkers
   *
   * @constructor
   * @override
  */
  var PhotoMarkers = function(opt_markers, opt_options) {
    var options = opt_options || {};

    // Set default data model.
    options.data || (options.data = new PublicWaypointCollection());

    options.data.getQuery().set([{
      property: 'type',
      value: '1:1',
      operator: 'AND'
    }], { remove: false, validate: true });

    PublicWaypointMarkers.call(this, opt_markers, options);
  };
  _.inherits(PhotoMarkers, PublicWaypointMarkers);


  return _.expose(PhotoMarkers, 'aeris.polaris.maps.PhotoMarkers');
});

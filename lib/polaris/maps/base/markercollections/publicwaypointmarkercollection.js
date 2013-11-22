define([
  'aeris/util',
  'polaris/maps/base/markercollections/poimarkercollection',
  'polaris/maps/base/markers/publicwaypointmarker',
  'polaris/api/endpoint/collection/publicwaypointcollection'
], function(_, POIMarkers, PublicWaypointMarker, PublicWaypointCollection) {
  /**
   * A collection of markers acting as views models for
   * a collection of aeris.polaris.api.endpoint.collection.PublicWaypointCollection
   * data models.
   * 
   * @class aeris.polaris.maps.PublicWaypointMarkers
   * @extends aeris.polaris.maps.POIMarkers
   *
   * @constructor
   * @override
  */
  var PublicWaypointMarkers = function(opt_markers, opt_options) {
    var options = _.defaults(opt_options || {}, {
      model: PublicWaypointMarker
    });

    // Set default data model.
    options.data || (options.data = new PublicWaypointCollection());

    POIMarkers.call(this, opt_markers, options);
  };
  _.inherits(PublicWaypointMarkers, POIMarkers);
  
  
  return _.expose(PublicWaypointMarkers, 'aeris.polaris.maps.PublicWaypointMarkers');
});

define([
  'aeris/util',
  'mapbuilder/markers/controller/markercontroller'
], function(_, MarkerController) {
  /**
   * Controls a {aeris.polaris.maps.TrailheadMarkers} view.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.controller.TrailheadsController
   * @extends aeris.builder.maps.markers.controller.MarkerController
   *
   * @constructor
   * @override
  */
  var TrailheadsController = function() {
    MarkerController.apply(this, arguments);

    this.listenTo(this.eventHub_, 'trailhead:click', function(latLon, marker) {
      this.zoomToMarker(marker);
    });
  };
  _.inherits(TrailheadsController, MarkerController);


  TrailheadsController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('trailhead:click', latLon, marker);
  };


  return TrailheadsController;
});

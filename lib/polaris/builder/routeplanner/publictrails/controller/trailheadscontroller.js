define([
  'aeris/util',
  'mapbuilder/markers/controller/markercontroller',
  'aeris/config'
], function(_, MarkerController, config) {
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


  /**
   * @override
   */
  TrailheadsController.prototype.onRender = function() {
    if (MarkerController.prototype.onRender) {
      MarkerController.prototype.onRender.apply(this, arguments);
    }

    this.listenTo(this.view_, {
      'cluster:click': function(latLon) {
        var mapOptions = this.appState_.get('mapOptions');

        // Zoom in to 10, or one level deeper than currently at.
        var targetZoom = mapOptions.get('zoom') < 10 ? 10 : mapOptions.get('zoom') + 1;

        this.appState_.get('mapOptions').set({
          center: latLon,
          zoom: targetZoom
        });
      }
    })
  };


  /**
   * @override
   */
  TrailheadsController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('trailhead:click', latLon, marker);
  };


  /**
   * @override
   */
  TrailheadsController.prototype.createView_ = function(TrailHeadMarkers) {
    return new TrailHeadMarkers(undefined, {
      cluster: true,
      clusterStyles: {
        default: [{
          url: config.get('path') + 'assets/polaris/markers/small/trailhead.png',
          width: 26,
          height: 40,
          textColor: '#ffffff',
          textSize: 13,
          anchorText: [-21, 16]
        }]
      },
      clusterOptions: {
        title: 'Trailheads',
        maxZoom: 14,
        gridSize: 40,
        zoomOnClick: false
      }
    });
  };


  return TrailheadsController;
});

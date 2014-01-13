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
  var TrailheadsController = function(options) {
    this.trailData_ = options.trailData;

    MarkerController.apply(this, arguments);
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
      'cluster:click': this.zoomAndCenter_
    });

    this.listenTo(this.eventHub_, {
      'trail:select': function(trail) {
        var loc = trail.getAtPath('trailhead.loc');
        var latLon = [loc.lat, loc.lon];

        this.zoomAndCenter_(latLon, 13);
      }
    })
  };


  TrailheadsController.prototype.zoomAndCenter_ = function(latLon, opt_maxZoom) {
    var mapOptions = this.appState_.get('mapOptions');
    var maxZoom = _.isUndefined(opt_maxZoom) ? 10 : opt_maxZoom;

    // Zoom in to 10, or one level deeper than currently at.
    var targetZoom = mapOptions.get('zoom') >= maxZoom ? mapOptions.get('zoom') : mapOptions.get('zoom') + 1;

    this.appState_.get('mapOptions').set({
      center: latLon,
      zoom: targetZoom
    });
  };


  /**
   * @override
   */
  TrailheadsController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('trailhead:click', latLon, marker);
    this.eventHub_.trigger('trail:select', marker.getData());
  };


  /**
   * @override
   */
  TrailheadsController.prototype.createView_ = function() {
    var TrailHeadMarkers = this.model.getMapObject();
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
        maxZoom: 20,
        gridSize: 40,
        zoomOnClick: true
      },
      data: this.trailData_
    });
  };


  return TrailheadsController;
});

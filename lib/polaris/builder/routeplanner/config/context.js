define([
  'aeris/util',
  'aeris/config',
  'routebuilder/config/context',
  'polaris/routeplanner/routeplannerapp/config/context',
  'polaris/routeplanner/waypoints/config/context'
], function(_, config, routeBuilderContext, appContext, waypointsContext) {
  /**
   * WireJS IoC spec for
   * the Polaris RoutePlanner app.
   *
   * @class aeris.polaris.builder.routeplanner.config.context
   * @extends aeris.builder.routes.config.context
   *
   * @static
   */
  return _.extend({}, routeBuilderContext, {
    builderOptions: {
      create: {
        module: 'polaris/routeplanner/options/routeplanneroptions',
        args: [
          null,
          {
            defaults: {
              mapOptions: {
                zoom: 12,
                center: [44.98, -93.2636],
                scrollZoom: true
              },
              waypoints: [
                {
                  name: 'POIMarkers',
                  default: false,
                  filters: ['food']
                }
              ],
              route: {
                path: {
                  strokeColor: '#36648b',
                  strokeOpacity: 0.8,
                  strokeWeight: 3
                },
                offPath: {
                  strokeColor: '#dd0000'
                },
                waypoint: {
                  url: config.get('path') + 'assets/marker_grey.png',
                  width: 20,
                  height: 20,
                  clickable: true,
                  draggable: true
                },
                selectedWaypoint: {
                  url: config.get('path') + 'assets/marker_yellow.png'
                }
              },
              routeControls: {
                undo: true,
                travelModes: ['WALKING', 'DRIVING', 'BICYCLING'],
                startingPoint: true,
                distance: true,
                metric: false
              }
            }, // end default options
            mapObjectTypes: ['layers', 'markers', 'waypoints']
          }
        ] // end builderOptions args
      }
    }
  }, appContext, waypointsContext);
});
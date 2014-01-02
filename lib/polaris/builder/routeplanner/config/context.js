define([
  'aeris/util',
  'aeris/config',
  'routeappbuilder/config/context',
  'strategy/route/waypoint',
  'polaris/routeplanner/routeplannerapp/config/context',
  'polaris/routeplanner/routebuilder/config/context',
  'polaris/routeplanner/waypoints/config/context',
  'polaris/routeplanner/publictrails/config/context',
  'polaris/routeplanner/routedetails/config/context',
  'polaris/routeplanner/mapcontrols/config/context',
  'polaris/routeplanner/geosearch/config/context'
], function(_, config, routeBuilderContext, Waypoint) {
  /**
   * WireJS IoC spec for
   * the Polaris RoutePlanner app.
   *
   * @class aeris.polaris.builder.routeplanner.config.context
   * @extends aeris.builder.routes.config.context
   *
   * @static
   */
  var context = {};

  _.extend(context, routeBuilderContext);

  _.extend(context, {
    exposedObjects: {
      create: {
        module: 'application/model/eventparambag',
        args: [
          {
            state: { $ref: 'appState' },
            eventHub: { $ref: 'eventHub' }
          },
          {
            eventHub: { $ref: 'eventHub' },
            eventTransformer: { $ref: 'eventTransformer' },
            eventParamAttributes: {
              'route:load': 'modelToJSON | route',
              'waypoint:click': 'clickToJSON | selectedWaypoint',
              'publicwaypoint:click': 'clickToJSON | selectedWaypoint',
              'trailhead:click': 'clickToJSON | selectedTrail'
            }
          }
        ]
      }
    },

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
                  type: 'fuel',
                  selected: false
                },
                {
                  type: 'food',
                  selected: false
                },
                {
                  type: 'medical',
                  selected: false
                },
                {
                  type: 'dealers',
                  selected: false,
                  filters: ['snow', 'orv']
                },
                {
                  type: 'photo',
                  selected: false
                },
                {
                  type: 'hazard',
                  selected: false
                },
                {
                  type: 'closure',
                  selected: false
                },
                {
                  type: 'parking',
                  selected: false
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
              publicTrails: {
                default: false,
                trailTypes: ['snow', 'orv']
              },
              routeControls: {
                undo: true,
                travelModes: [
                  Waypoint.travelMode.WALKING,
                  Waypoint.travelMode.DRIVING,
                  Waypoint.travelMode.BICYCLING
                ],
                startingPoint: true,
                distance: true,
                metric: false
              },
              controls: {
                layers: false,
                markers: false,
                waypoints: true,
                publicTrails: true,
                geolocation: true,
                geocode: true,
                routeBuilder: true
              }
            }, // end default options
            mapObjectTypes: ['layers', 'markers', 'waypoints']
          }
        ] // end builderOptions args
      }
    }
  });

  // Mixin module contexts
  _.extend(context,
    require('polaris/routeplanner/routeplannerapp/config/context'),
    require('polaris/routeplanner/routebuilder/config/context'),
    require('polaris/routeplanner/waypoints/config/context'),
    require('polaris/routeplanner/publictrails/config/context'),
    require('polaris/routeplanner/routedetails/config/context'),
    require('polaris/routeplanner/mapcontrols/config/context'),
    require('polaris/routeplanner/geosearch/config/context')
  );

  return context;
});

define([
  'aeris/util',
  'mapbuilder/markers/config/context'
], function(_, markersContext) {
  /**
   * WireJS IoC spec for the Polaris RoutePlanner: Waypoints module.
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.context
   * @extends aeris.builder.maps.markers.config.context
   */
  return _.extend({}, markersContext, {
    waypointStateCollection: _.extendFactorySpec(markersContext.markerStateCollection, {
      create: {
        args: [
          undefined,
          {
            model: { $ref: 'WaypointState' }
          }
        ]
      }
    }),

    WaypointState: {
      create: {
        module: 'aeris/classfactory',
        args: [
          { module: 'mapbuilder/markers/model/markerstate' },
          [
            undefined,
            {
              namespace: 'aeris.polaris.maps'
            }
          ],
          { extendArgObjects: true }
        ]
      }
    },

    waypointsModule: _.extendFactorySpec(markersContext.markersModule, {
      create: {
        args: [{
          appStateAttr: 'waypoints',
          moduleState: { $ref: 'waypointStateCollection' },

          mapObjectController: { $ref: 'waypointViewController' },
          controlsController: { $ref: 'waypointControlsController' },

          validFilters: { module: 'polaris/routeplanner/waypoints/config/validMarkerFilters' }
        }]
      }
    }),

    waypointViewController: _.extendFactorySpec(markersContext.markerViewController, {
      create: {
        args: [{
          collection: { $ref: 'waypointStateCollection' }
        }]
      }
    }),

    waypointControlsController: _.extendFactorySpec(markersContext.markerControlsController, {
      create: {
        args: [{
          collection: { $ref: 'waypointStateCollection' }
        }]
      }
    })
  });
});

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

    WaypointState: _.classFactorySpec({
      create: {
        module: 'mapbuilder/markers/model/markerstate',
        args: [
          undefined,
          {
            namespace: 'aeris.polaris.maps'
          }
        ]
      }
    }),

    waypointsModule: _.extendFactorySpec(markersContext.markersModule, {
      create: {
        args: [{
          appStateAttr: 'waypoints',
          moduleState: { $ref: 'waypointStateCollection' },

          mapObjectController: { $ref: 'waypointViewController' },

          moduleController: { $ref: 'waypointLayout' },

          validFilters: { module: 'polaris/routeplanner/waypoints/config/validMarkerFilters' }
        }]
      }
    }),

    // Top-level layout for Waypoints module
    waypointLayout: _.extendFactorySpec(markersContext.markerLayout, {
      create: {
        args: [{
          MarkerDataController: { $ref: 'WaypointDataController' },

          regionControllers: {
            // Render the WaypointControls view
            // in the markerControls region
            markerControls: { $ref: 'waypointControlsController' }
          }
        }]
      }
    }),

    // Waypoint MapExtObjects
    waypointViewController: _.extendFactorySpec(markersContext.markerViewController, {
      create: {
        args: [{
          collection: { $ref: 'waypointStateCollection' }
        }]
      }
    }),

    // Waypoint UI Controls
    waypointControlsController: _.extendFactorySpec(markersContext.markerControlsController, {
      create: {
        args: [{
          collection: { $ref: 'comboFilterCollection' },
          itemViewOptions: {
            className: 'aeris-subMenuItem'
          }
        }]
      }
    },

    comboFilterCollection: {
      create: {
        module: 'application/form/collection/togglecollection',
        args: [undefined, {
          model: { module: 'polaris/routeplanner/waypoints/model/combofiltertoggle' }
        }]
      }
    }),

    // Controls the waypoint details view
    WaypointDataController: _.classFactorySpec({
      create: {
        module: 'polaris/routeplanner/waypoints/controller/waypointdatacontroller',
        args: [{
          className: 'aeris-content',
          template: { module: 'hbs!polaris/routeplanner/waypoints/view/waypointdetails.html' },
          events: {
            'click .aeris-closeBtn': 'close'
          },
          ui: {
            header: '.aeris-waypointDetails-header',
            revealBtn: '.aeris-revealBtn',
            hideBtn: '.aeris-hideBtn',
            dragHandle: '.aeris-dragHandle'
          }
        }]
      }
    })
  });
});

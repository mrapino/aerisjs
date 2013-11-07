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
        module: 'polaris/routeplanner/waypoints/module/waypointsmodule',
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
        module: 'polaris/routeplanner/waypoints/controller/waypointlayout',
        args: [{
          MarkerDataController: { $ref: 'WaypointDataController' },
          menuController: { $ref: 'waypointMenuController' },

          regionControllers: {
            markerControls: { $ref: 'waypointMenuController' }
          },

          moduleState: { $ref: 'waypointStateCollection' }
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

    waypointMenuController: {
      create: {
        module: 'application/form/controller/togglecollectioncontroller',
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
          model: { $ref: 'ComboFilterToggle' }
        }]
      }
    },

    ComboFilterToggle: _.classFactorySpec({
      create: {
        module: 'application/form/model/combotoggle',
        args: [undefined, {
          childTogglesAttribute: 'filters'
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

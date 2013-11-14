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
          controlsController: { $ref: 'waypointMenuController' },

          validFilters: { module: 'polaris/routeplanner/waypoints/config/validmarkerfilters' }
        }]
      }
    }),

    // Waypoint MapExtObjects (PointDataMarkerCollection objs)
    waypointViewController: _.extendFactorySpec(markersContext.markerViewController, {
      create: {
        args: [{
          itemView: { module:'polaris/routeplanner/waypoints/controller/waypointcontroller' },
          collection: { $ref: 'waypointStateCollection' }
        }]
      }
    }),

    // Controls the waypoint menu view.
    waypointMenuController: {
      create: {
        module: 'polaris/routeplanner/waypoints/controller/waypointmenucontroller',
        args: [{
          collection: { $ref: 'comboFilterCollection' },

          name: 'waypoints',
          eventHub: { $ref: 'eventHub' },

          template: { module: 'hbs!polaris/routeplanner/waypoints/view/waypointmenu.html' },
          itemViewContainer: '.aeris-subMenu',
          className: 'aeris-navItem',

          ui: {
            subMenu: '.aeris-subMenu'
          },

          itemViewOptions: {
            className: 'aeris-subMenuItem',
            selectedClass: 'aeris-selected',
            deselectedClass: 'aeris-deselected'
          }
        }]
      }
    },

    // Combined toggle models, representing
    // one or more fitlers to toggle together.
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
    // (override Marker App's InfoController defintion
    MarkerInfoController: _.classFactorySpec({
      create: {
        module: 'polaris/routeplanner/waypoints/controller/waypointinfocontroller',
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

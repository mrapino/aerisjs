define({
  $exports: { $ref: 'waypointsModule' },

  waypointStateCollection: {
    create: {
      module: 'mapbuilder/core/collection/mapobjecttogglecollection',
      args: [
        undefined,
        {
          model: { module: 'mapbuilder/markers/model/markertoggle' },
          modelOptions: {
            idAttribute: 'type'
          }
        }
      ]
    }
  },

  eventDataTransformer: { module: 'mapbuilder/transformer/eventdatatransformer' },

  // Waypoints Module
  // will set our initial state
  // using the waypoints builder config,
  // then render out controllers
  waypointsModule: {
    create: {
      module: 'polaris/routeplanner/waypoints/module/waypointsmodule',
      args: [
        {
          appStateAttr: 'waypoints',
          moduleState: { $ref: 'waypointStateCollection' },

          appState: { $ref: 'appState' },
          eventHub: { $ref: 'eventHub' },

          mapObjectController: { $ref: 'waypointViewController' },
          menuController: { $ref: 'waypointMenuController' },
          MarkerInfoController: { $ref: 'MarkerInfoController' }
        }
      ]
    },
    listenTo: {
      eventHub: {
        'waypoint:click': 'eventDataTransformer.markerClick | renderMarkerInfo'
      }
    }
  },

  // Waypoint MapExtObjects (PointDataMarkerCollection objs)
  waypointViewController: {
    create: {
      module: 'polaris/routeplanner/waypoints/controller/waypointcollectioncontroller',
      args: [
        {
          collection: { $ref: 'waypointStateCollection' },

          PublicWaypointsItemView: { module: 'polaris/routeplanner/waypoints/controller/publicwaypointcontroller' },
          PoiItemView: { module: 'polaris/routeplanner/waypoints/controller/poiwaypointcontroller' },
          DealersItemView: { module: 'polaris/routeplanner/waypoints/controller/dealerwaypointcontroller' },

          itemViewOptions: {
            appState: { $ref: 'appState' },
            eventHub: { $ref: 'eventHub' }
          }
        }
      ]
    }
  },

  // Controls the waypoint menu view.
  waypointMenuController: {
    create: {
      module: 'polaris/routeplanner/waypoints/controller/waypointmenucontroller',
      args: [
        {
          collection: { $ref: 'waypointStateCollection' },

          name: 'waypoints',
          eventHub: { $ref: 'eventHub' },

          template: { module: 'hbars!polaris/routeplanner/waypoints/view/waypointmenu.html' },
          itemViewContainer: '.menuControls',

          ui: {
            subMenu: '.menuControls'
          },

          itemViewOptions: {
            selectedClass: 'checked',
            deselectedClass: '',
            template: { module: 'hbars!polaris/routeplanner/waypoints/view/waypointmenuitem.html'}
          }
        }
      ]
    }
  },

  // Controls the waypoint details view
  // (override Marker App's InfoController defintion
  MarkerInfoController: {
    ClassFactory: {
      module: 'polaris/routeplanner/waypoints/controller/waypointinfocontroller',
      args: [
        {
          className: 'aeris-content',
          template: { module: 'hbars!polaris/routeplanner/waypoints/view/waypointdetails.html' },

          events: {
            'click h1': 'close'
          },

          ui: {
            content: 'section, header',
            toggleSwitch: 'h1'
          },

          templateHelpers: {
            typeIconClass: { module: 'polaris/routeplanner/waypoints/view/helper/typeiconclass' }
          }
        }
      ]
    }
  },

  $plugins: [
    { module: 'application/plugin/classfactory' },
    { module: 'application/plugin/events' }
  ]
});

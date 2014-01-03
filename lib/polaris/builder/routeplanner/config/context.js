define({
  eventHub: { create: 'mapbuilder/event/eventhub' },

  appState: { create: 'mapbuilder/core/model/state' },

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

  eventTransformer: { module: 'mapbuilder/transformer/eventdatatransformer' },

  builderOptions: {
    create: {
      module: 'polaris/routeplanner/options/routeplanneroptions',
      args: [
        null,
        {
          defaults: { wire: 'polaris/routeplanner/config/builderoptions' },
          mapObjectTypes: { wire: 'polaris/routeplanner/config/mapobjecttypes' }
        }
      ]
    }
  },

  routePlannerApp: { wire: 'polaris/routeplanner/routeplannerapp/config/app' }
});

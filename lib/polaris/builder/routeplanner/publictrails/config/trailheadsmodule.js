define({
  $exports: { $ref: 'trailHeadsModule' },

  // Sub-module for trail head markers
  trailHeadsModule: {
    create: {
      module: 'polaris/builder/routeplanner/publictrails/module/trailheadsmodule',
      args: [
        {
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'trailHeadState' },

          eventHub: { $ref: 'eventHub' },

          controlsController: { $ref: 'publicTrailsMenuController' },
          trailheadsController: { $ref: 'trailheadMarkersController' }
        }
      ]
    }
  },

  // Create a single MapObject controller
  // to render our TrailheadMarkersCollection.
  trailheadMarkersController: {
    create: {
      module: 'polaris/builder/routeplanner/publictrails/controller/trailheadscontroller',
      args: [
        {
          model: { $ref: 'trailHeadState' },
          appState: { $ref: 'appState' },
          eventHub: { $ref: 'eventHub'  }
        }
      ]
    }
  }
});

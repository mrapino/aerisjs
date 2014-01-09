define({
  $exports: { $ref: 'trailHeadsModule' },

  // Sub-module for trail head markers
  trailHeadsModule: {
    create: {
      module: 'polaris/routeplanner/publictrails/module/trailheadsmodule',
      args: [
        {
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'trailHeadState' },

          eventHub: { $ref: 'eventHub' },

          controlsController: { $ref: 'publicTrailsMenuController' },
          trailheadsController: { $ref: 'trailheadMarkersController' },
          TrailInfoController: { $ref: 'TrailInfoController' }
        }
      ]
    },
    listenTo: {
      eventHub: {
        'trailhead:click': 'eventTransformer.markerClick | renderTrailInfo'
      }
    }
  },

  // Create a single MapObject controller
  // to render our TrailheadMarkersCollection.
  trailheadMarkersController: {
    create: {
      module: 'polaris/routeplanner/publictrails/controller/trailheadscontroller',
      args: [
        {
          model: { $ref: 'trailHeadState' },
          appState: { $ref: 'appState' },
          eventHub: { $ref: 'eventHub'  }
        }
      ]
    }
  },

  TrailInfoController: {
    ClassFactory: {
      module: 'polaris/routeplanner/publictrails/controller/trailinfocontroller',
      args: [
        {
          template: { module: 'hbars!polaris/routeplanner/publictrails/view/trailinfo.html'},

          ui: {
            closeBtn: 'h1'
          }
        }
      ]
    }
  },

  $plugins: [
    { module: 'application/plugin/events' },
    { module: 'application/plugin/classfactory' }
  ]
});

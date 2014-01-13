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
        'trail:select': 'renderTrailInfo'
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
          eventHub: { $ref: 'eventHub'  },
          trailData: { $ref: 'trailData' }
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
          templateHelpers: { module: 'polaris/routeplanner/publictrails/templatehelpers/trailinfo' },
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

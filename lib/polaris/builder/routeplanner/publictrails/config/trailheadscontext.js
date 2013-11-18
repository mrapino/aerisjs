define([
  'aeris/util'
], function(_) {
  /**
   * WireJS spec for the public trails Trails Heads sub-module
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.config.trailHeadsContext
   * @static
   */
  return {
    // Sub-module for trail head markers
    trailHeadsModule: {
      create: {
        module: 'polaris/builder/routeplanner/publictrails/module/trailheadsmodule',
        args: [{
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'trailHeadState' },

          eventHub: { $ref: 'eventHub' },

          controlsController: { $ref: 'publicTrailsMenuController' },
          trailheadsController: { $ref: 'trailheadMarkersController' }
        }]
      }
    },

    // Our module state is a single model
    // which represents an on/off state for
    // public trails.
    trailHeadState: {
      create: {
        module: 'mapbuilder/markers/model/markerstate',
        args: [undefined,
          {
            namespace: 'aeris.polaris.maps'
          }
        ]
      }
    },

    // Create a single MapObject controller
    // to render our TrailheadMarkersCollection.
    trailheadMarkersController: {
      create: {
        module: 'polaris/builder/routeplanner/publictrails/controller/trailheadscontroller',
        args: [{
          model: { $ref: 'trailHeadState' },
          appState: { $ref: 'appState' },
          eventHub: { $ref: 'eventHub'  }
        }]
      }
    }
  };
});

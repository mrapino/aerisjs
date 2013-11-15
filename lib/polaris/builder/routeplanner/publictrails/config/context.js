define([
  'aeris/util'
], function(_) {
  return {
    publicTrailsModule: {
      create: {
        module: 'polaris/builder/routeplanner/publictrails/module/publictrailsmodule',
        args: [{
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'publicTrailsState' },
          appStateAttr: 'publicTrails',

          eventHub: { $ref: 'eventHub' },

          controlsController: { $ref: 'publicTrailsMenuController' },
          trailheadsController: { $ref: 'trailheadMarkersController' }
          //trailTilesController: { $ref: 'trailTilesViewController' },
        }]
      }
    },

    // Our module state is a single model
    // which represents an on/off state for
    // public trails.
    publicTrailsState: {
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
          model: { $ref: 'publicTrailsState' },
          appState: { $ref: 'appState' },
          eventHub: { $ref: 'eventHub'  }
        }]
      }
    },


    // Nav menu controls to
    // select/deselect our publicTrailsState
    // model.
    // (which in turn will tell our MapObject controllers
    //  to render/remove their objects)
    publicTrailsMenuController: {
      create: {
        module: 'application/form/controller/togglecontroller',
        args: [{
          className: 'aeris-navItem',
          template: { module: 'hbs!polaris/builder/routeplanner/publictrails/view/menucontrol.html' },

          selectedClass: 'aeris-selected',
          deselectedClass: 'aeris-deselected',
          model: { $ref: 'publicTrailsState' },
          ui: {
            'selectBtn': 'a'
          },
          events: {
            'click a': 'toggleModel'
          }
        }]
      }
    }

  };
});

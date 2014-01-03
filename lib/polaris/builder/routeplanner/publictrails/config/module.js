define({
  $exports: { $ref: 'publicTrailsModule' },

  // The publicTrails module
  // start up the trailHeads and trailLayers modules
  publicTrailsModule: {
    create: {
      module: 'polaris/routeplanner/publictrails/module/publictrailsmodule',
      args: [
        {
          modules: {
            trailHeads: {
              wire: 'polaris/routeplanner/publictrails/config/trailheadsmodule'
            },
            trailLayers: {
              wire: 'polaris/routeplanner/publictrails/config/traillayersmodule'
            }
          },

          comboState: { $ref: 'publicTrailsComboToggle' },
          trailHeadState: {
            wire: 'polaris/routeplanner/publictrails/config/trailheadstate'
          },
          trailLayersStateCollection: {
            wire: 'polaris/routeplanner/publictrails/config/traillayersstatecollection'
          }
        }
      ]
    }
  },

  // A combo toggle,
  // controlling all map object state objects
  // (trail layer and trail head marker states)
  publicTrailsComboToggle: {
    create: {
      module: 'application/form/model/combotoggle',
      args: [
        {
          name: 'Public Trails'
        }
      ]
    }
  },


  // Nav menu controls to
  // select/deselect our trailHeadState
  // model.
  // (which in turn will tell our MapObject controllers
  //  to render/remove their objects)
  publicTrailsMenuController: {
    create: {
      module: 'application/form/controller/togglecontroller',
      args: [
        {
          template: { module: 'hbars!polaris/routeplanner/publictrails/view/menucontrol.html' },

          selectedClass: 'checked',
          deselectedClass: '',
          model: { $ref: 'publicTrailsComboToggle' },
          ui: {
            'selectBtn': 'input'
          },
          events: {
            'change input': 'toggleModel'
          }
        }
      ]
    }
  }
});

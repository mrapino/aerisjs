define({
  $exports: { $ref: 'trailLayersModule' },

  // Manages trail layers
  trailLayersModule: {
    create: {
      module: 'polaris/routeplanner/publictrails/module/traillayersmodule',
      args: [
        {
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'trailLayersStateCollection'},

          trailLayersController: { $ref: 'trailLayerViewController' }
        }
      ]
    }
  },

  // Controls a collection of trail layer
  // MapObject views
  trailLayerViewController: {
    create: {
      module: 'mapbuilder/core/controller/mapobjectcollectioncontroller',
      args: [
        {
          collection: { $ref: 'trailLayersStateCollection' },
          itemViewOptions: {
            appState: { $ref: 'appState' }
          }
        }
      ]
    }
  }
});

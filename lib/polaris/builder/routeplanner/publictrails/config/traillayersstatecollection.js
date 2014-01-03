define({
  $exports: { $ref: 'trailLayersStateCollection' },


  // Represents a collection of trail layers
  // (ToggleCollection)
  trailLayersStateCollection: {
    create: {
      module: 'mapbuilder/core/collection/mapobjecttogglecollection',
      args: [undefined, {
        modelOptions: {
          namespace: 'aeris.polaris.maps.layers'
        }
      }]
    }
  }
})
define({
  $exports: { $ref: 'trailHeadState' },

  // Our module state is a single model
  // which represents an on/off state for
  // public trails.
  trailHeadState: {
    create: {
      module: 'mapbuilder/markers/model/markertoggle',
      args: [undefined,
        {
          namespace: 'aeris.polaris.maps'
        }
      ]
    }
  }
});
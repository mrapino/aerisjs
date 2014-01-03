define({
  $exports: { $ref: 'routeBuilderModule' },

  routeBuilderModule: {
    wire: {
      spec: 'routeappbuilder/routebuilder/config/module',
      provide: {
        routeBuilderOptions: { $ref: 'routeBuilderOptions' }
      }
    }
  },

  routeBuilderOptions: {
    travelMode: { $ref: 'travelMode!DRIVING' },
    followDirections: false,
    styles: {}
  },

  $plugins: [
    { module: 'routeappbuilder/plugin/travelmode' }
  ]
});

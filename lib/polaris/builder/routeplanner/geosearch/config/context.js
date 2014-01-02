define({
  $exports: { $ref: 'geosearchModule' },

  geolocateTemplate: { module: 'hbars!polaris/routeplanner/geosearch/view/geolocate.html' },

  geosearchModule: {
    wire: {
      spec: 'mapbuilder/geosearch/config/context',
      provide: {
        geolocateTemplate: { $ref: 'geolocateTemplate' }
      }
    }
  }
});

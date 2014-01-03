define({
  $exports: { $ref: 'mapControlsModule' },

  mapControlsModule: {
    wire: {
      spec: 'mapbuilder/mapcontrols/config/module',
      provide: {
        mapControlsRegions: { wire: 'polaris/routeplanner/mapcontrols/config/regions' },

        controlsRegionLookup: {
          geolocation: 'geolocateControlsRegion',
          geocode: 'geocodeControlsRegion',
          layers: 'layerControlsRegion',
          markers: 'markerControlsRegion',
          routeBuilder: 'routeBuilderControlsRegion',
          waypoints: 'waypointControlsRegion',
          publicTrails: 'publicTrailsControlsRegion'
        },

        mapControlsTemplate: { module: 'hbars!polaris/routeplanner/mapcontrols/view/controls.html' }
      }
    }
  }


});

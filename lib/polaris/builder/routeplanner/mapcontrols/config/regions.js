define({
  $exports: {
    geolocateControlsRegion: { $ref: 'parentRegions.geolocateControlsRegion' },
    geocodeControlsRegion: { $ref: 'parentRegions.geocodeControlsRegion' },
    layerControlsRegion: { $ref: 'parentRegions.layerControlsRegion' },
    markerControlsRegion: { $ref: 'parentRegions.markerControlsRegion' },
    routeBuilderControlsRegion: { $ref: 'parentRegions.routeBuilderControlsRegion'},

    waypointControlsRegion: '.waypointControls',
    publicTrailsControlsRegion: '.publicTrailsControls',
    nearbyTrailsControlsRegion: '.nearbyTrailsRegion'
  },

  parentRegions: { wire: 'routeappbuilder/mapcontrols/config/regions' }
});
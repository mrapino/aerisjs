define({
  $exports: {
    map: { wire: 'mapbuilder/map/config/module' },
    mapControls: { wire: 'polaris/routeplanner/mapControls/config/module' },
    markers: { wire: 'mapbuilder/markers/config/module' },
    layers: { wire: 'mapbuilder/layers/config/module' },
    infoPanel: { wire: 'mapbuilder/infopanel/config/module'},
    geosearch: { wire: 'polaris/routeplanner/geosearch/config/module' },
    modal: { wire: 'mapbuilder/modal/config/module' },
    routeBuilder: { wire: 'polaris/routeplanner/routebuilder/config/module' },
    waypoints: { wire: 'polaris/routeplanner/waypoints/config/module' },
    publicTrails: { wire: 'polaris/routeplanner/publictrails/config/module' },
    routeDetails: { wire: 'polaris/routeplanner/routedetails/config/module' }
  }
});

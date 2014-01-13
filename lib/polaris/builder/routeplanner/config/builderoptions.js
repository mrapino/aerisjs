define({
  $exports: { $ref: 'defaultBuilderOptions' },

  defaultBuilderOptions: {
    mapOptions: {
      zoom: 10,
      center: [44.98, -93.2636],
      scrollZoom: true
    },
    waypoints: [
      {
        type: 'fuel',
        selected: false
      },
      {
        type: 'food',
        selected: false
      },
      {
        type: 'medical',
        selected: false
      },
      {
        type: 'dealers',
        selected: false,
        filters: ['snow', 'orv']
      },
      {
        type: 'photo',
        selected: false
      },
      {
        type: 'hazard',
        selected: false
      },
      {
        type: 'closure',
        selected: false
      },
      {
        type: 'parking',
        selected: false
      }
    ],
    route: {
      path: {
        strokeColor: '#36648b',
        strokeOpacity: 0.8,
        strokeWeight: 3
      },
      offPath: {
        strokeColor: '#dd0000'
      },
      waypoint: {
        url: { $ref: 'assetPath!marker_grey.png' },
        width: 20,
        height: 20,
        clickable: true,
        draggable: true
      },
      selectedWaypoint: {
        url: { $ref: 'assetPath!marker_yellow.png' }
      }
    },
    publicTrails: {
      default: true,
      trailTypes: ['snow', 'orv']
    },
    routeControls: {
      undo: true,
      travelModes: [
        { $ref: 'travelMode!WALKING' },
        { $ref: 'travelMode!DRIVING' },
        { $ref: 'travelMode!BICYCLING' }
      ],
      startingPoint: true,
      distance: true,
      metric: false
    },
    controls: {
      layers: false,
      markers: false,
      waypoints: true,
      publicTrails: true,
      nearbyTrails: true,
      geolocation: true,
      geocode: true,
      routeBuilder: true
    }
  },

  $plugins: [
    { module: 'routeappbuilder/plugin/travelmode' },
    { module: 'application/plugin/assetpath' }
  ]
});

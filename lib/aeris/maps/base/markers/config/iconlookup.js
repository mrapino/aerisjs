define(
  /**
   * Lookup objects to match a
   * marker type to its icon file name.
   *
   * @class aeris.maps.markers.config.iconLookup
   * @static
   */
  {
    stormReport: {
      avalanche: 'stormrep_marker_avalanche',
      blizzard: 'stormrep_marker_snow',
      sleet: 'stormrep_marker_ice',
      flood: 'stormrep_marker_flood',
      fog: 'stormrep_marker_densefog',
      ice: 'stormrep_marker_ice',
      hail: 'stormrep_marker_hail',
      lightning: 'stormrep_marker_lightning',
      rain: 'stormrep_marker_rain',
      snow: 'stormrep_marker_snow',
      tides: 'stormrep_marker_highsurf',
      spout: 'stormrep_marker_tornado',
      tornado: 'stormrep_marker_tornado',
      wind: 'stormrep_marker_highwind'
    },
    earthquake: {
      mini: {
          name: 'quake_mini',
          offsetX: 9,
          offsetY: 0
      },
      minor: {
        name: 'quake_minor',
        offsetX: 0,
        offsetY: 0
      },
      light: {
        name: 'quake_light',
        offsetX: 0,
        offsetY: 0
      },
      moderate: {
        name: 'quake_moderate',
        offsetX: 0,
        offsetY: 0
      },
      strong: 'quake_strong',
      major: 'quake_major',
      great: 'quake_great',
      shallow: 'quake_mini'
    }
  }
);

define([
  'aeris/util',
  'routebuilder/mapcontrols/config/context'
], function(_, baseCtx) {
  /**
   * WireJS spec for the Routes app MapControls module
   * module.
   *
   * @class aeris.polaris.builder.routeplanner.mapcontrols.config.context
   */
  return {
    mapControlsRegions: _.extend({}, baseCtx.mapControlsRegions, {
      waypointControlsRegion: '.waypointControls',
      publicTrailsControlsRegion: '.publicTrailsControlsRegion'
    }),

    mapControlsControllerRegions: _.extend({}, baseCtx.mapControlsControllerRegions, {
      waypoints: 'waypointControlsRegion',
      publicTrails: 'publicTrailsControlsRegion'
    }),

    mapControlsTemplate: { module: 'hbs!polaris/routeplanner/mapcontrols/view/controls.html' }
  };
});

define([
  'aeris/util',
  'routeappbuilder/mapcontrols/config/context'
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
      publicTrailsControlsRegion: '.publicTrailsControls'
    }),

    mapControlsControllerRegions: _.extend({}, baseCtx.mapControlsControllerRegions, {
      waypoints: 'waypointControlsRegion',
      publicTrails: 'publicTrailsControlsRegion'
    }),

    mapControlsTemplate: { module: 'hbs!polaris/routeplanner/mapcontrols/view/controls.html' }
  };
});

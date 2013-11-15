define([
  'aeris/util',
  'routebuilder/routeapp/config/context'
], function(_, routeBuilderContext) {
  /**
   * WireJS Spec for the Polaris RoutePlanner main application module.
   *
   * @class aeris.polaris.builder.routeplanner.routeplannerapp.config.context
   * @extends aeris.builder.routes.routeapp.config.context
   *
   * @static
   */
  return _.extend({}, routeBuilderContext, {
    // Alias the base routeApp object
    routePlannerApp: { $ref: 'routeApp' },

    // Override base routeApp sub modules definition.
    routeAppSubModules: _.extend({},
      // Include modules defined by the base routeBuilder app config.
      routeBuilderContext.routeAppSubModules,
      {
        waypointsModule: { $ref: 'waypointsModule' },
        publicTrailsModule: { $ref: 'publicTrailsModule' }
      }
    )
  });
});

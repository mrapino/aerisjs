define([
  'aeris/util',
  'routeappbuilder/routeapp/config/context'
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

    routePlannerApp: {
      create: {
        module: 'polaris/routeplanner/routeplannerapp/module/routeplannerapp',
        args: [{
          layout: { $ref: 'mapAppLayout' },
          modules: { $ref: 'routePlannerAppSubModules' },
          route: { $ref: 'appRouter' }
        }]
      }
    },

    // Override base routeApp sub modules definition.
    routePlannerAppSubModules: _.extend({},
      // Include modules defined by the base routeBuilder app config.
      routeBuilderContext.routeAppSubModules,
      {
        waypoints: { $ref: 'waypointsModule' },
        publicTrails: { $ref: 'publicTrailsModule' },
        routeDetails: { $ref: 'routeDetailsModule' }
      }
    )
  });
});

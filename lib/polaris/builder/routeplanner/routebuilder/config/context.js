define([
  'routeappbuilder/routebuilder/config/context'
], function(routeBuilderCtx) {
  /**
   * WireJS Spec for RiderX RouteBuilder module
   *
   * @class aeris.polaris.builder.routeplanner.routebuilder.config.context
   * @extends aeris.builder.routes.routebuilder.config.context
   * @static
   */
  var context = {};

  _.extend(context, routeBuilderCtx);

  _.extend(context, {
    routeBuilder: {
      create: {
        module: 'strategy/route/routebuilder',
        args: [{
          followDirections: false,

          routeRenderer: { $ref: 'routeRenderer' },
          route: { $ref: 'route' }
        }]
      }
    }
  });

  return context;
});

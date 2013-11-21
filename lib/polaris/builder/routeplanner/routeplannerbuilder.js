define([
  'aeris/util',
  'aeris/promise',
  'routebuilder/routeappbuilder',
  'wire!polaris/routeplanner/config/context'
], function(_, Promise, RouteAppBuilder, context) {
  /**
   * Builder for the Polaris RoutePlanner app.
   *
   * @class aeris.builder.polaris.PolarisAppBuilder
   * @extends aeris.builder.routes.RouteAppBuilder
   *
   * @constructor
   * @override
   */
  var PolarisAppBuilder = function(opt_config, opt_builderOptions) {
    // Set builderOptions config
    var builderOptions = opt_builderOptions || context.builderOptions;

    RouteAppBuilder.call(this, opt_config, builderOptions);
  };
  _.inherits(PolarisAppBuilder, RouteAppBuilder);


  /**
   * @override
   */
  PolarisAppBuilder.prototype.build = function() {
    var buildPromise = new Promise();

    context.routePlannerApp.start(this.options_);

    buildPromise.resolve(context.exposedObjects);

    // Invoke callbacks
    buildPromise.
      done(this.options_.get('onload'), window).
      fail(this.options_.get('onerror'), window);

    return buildPromise;
  };


  return PolarisAppBuilder;
});

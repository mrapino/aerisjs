define([
  'aeris/util',
  'routebuilder/options/routebuilderoptions'
], function(_, RouteBuilderOptions) {
  /**
   * Builder config options
   * for the Polaris RoutePlanner app.
   *
   * @class aeris.polaris.builder.routeplanner.options.RoutePlannerOptions
   * @extends aeris.builder.routes.options.RouteBuilderOptions
   *
   * @constructor
   * @override
   */
  var RoutePlannerOptions = function() {
    RouteBuilderOptions.apply(this, arguments);
  };
  _.inherits(RoutePlannerOptions, RouteBuilderOptions);


  /**
   * @override
   */
  RoutePlannerOptions.prototype.normalize_ = function(builderOptions) {
    builderOptions = RouteBuilderOptions.prototype.normalize_.apply(this, arguments);

    // Set defaults for `controls` option
    builderOptions.controls = _.defaults({},
      builderOptions.controls,
      this.get('controls') || {},
      this.defaults.controls || {}
    );

    return builderOptions;
  };


  return RoutePlannerOptions;
});
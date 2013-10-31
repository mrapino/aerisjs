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


  return RoutePlannerOptions;
});
define([
  'aeris/util',
  'application/module/application'
], function(_, Application) {
  /**
   * Route planner app.
   *
   * @class aeris.polaris.builder.routeplanner.routeplannerapp.module.RoutePlannerApp
   * @extends aeris.application.module.Application
   *
   * @constructor
   * @override
  */
  var RoutePlannerApp = function() {
    Application.apply(this, arguments);
  };
  _.inherits(RoutePlannerApp, Application);


  /**
   * @override
   */
  RoutePlannerApp.prototype.filterChildModules_ = function(modules, builderOptions) {
    if (!builderOptions.get('routeDetails')) {
      modules = _.omit(modules, 'routeDetails');
    }

    return modules;
  };


  return RoutePlannerApp;
});

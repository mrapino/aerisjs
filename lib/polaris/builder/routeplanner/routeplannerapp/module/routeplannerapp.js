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
    // Only one of routeDetails and publicTrails modules
    // can exist at a time.
    if (builderOptions.get('routeDetails')) {
      modules = _.omit(modules, 'publicTrails')
    }
    else {
      modules = _.omit(modules, 'routeDetails');
    }

    // Filter our route builder module
    if (!builderOptions.getAtPath('controls.routeBuilder')) {
      modules = _.omit(modules, 'routeBuilder');
    }

    return modules;
  };


  return RoutePlannerApp;
});

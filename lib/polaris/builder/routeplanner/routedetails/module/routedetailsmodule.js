define([
  'aeris/util',
  'mapbuilder/core/module/statemodule'
], function(_, StateModule) {
  /**
   * Manages the route details view.
   *
   *
   * @class aeris.polaris.builder.routeplanner.routedetails.module.RouteDetailsModule
   * @extends aeris.builder.maps.core.module.StateModule
   *
   * @constructor
   * @override
   *
   * @param {Backbone.View} options.trailController
  */
  var RouteDetailsModule = function(options) {

    /**
     * Controller for the trail Polyline MapObject.
     *
     * @type {Backbone.View}
     * @private
     */
    this.trailController_ = options.trailController;

    StateModule.apply(this, arguments);

    this.addInitializer(this.renderControllers_);
  };
  _.inherits(RouteDetailsModule, StateModule);


  /**
   * @override
   */
  RouteDetailsModule.prototype.populateState_ = function(builderOptions) {
    this.moduleState_.set(builderOptions.get('routeDetails'));
  };


  /**
   * Render module controllers.
   *
   * @param {aeris.Model} builderOptions
   * @private
   */
  RouteDetailsModule.prototype.renderControllers_ = function(builderOptions) {
    var moduleOptions = builderOptions.get('routeDetails');

    this.trailController_.setTrailId(moduleOptions.trailId);
    this.trailController_.setStyle(moduleOptions.style || {});
    this.trailController_.render();
  };


  return RouteDetailsModule;
});

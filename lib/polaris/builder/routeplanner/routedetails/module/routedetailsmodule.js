define([
  'aeris/util',
  'mapbuilder/core/module/statemodule',
  'aeris/errors/apiresponseerror'
], function(_, StateModule, ApiResponseError) {
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
   * @param {Backbone.View} options.trailheadController
   * @param {aeris.Model} options.trail
   * @param {aeris.Events} options.eventHub
  */
  var RouteDetailsModule = function(options) {

    /**
     * Controller for the trail Polyline MapObject.
     *
     * @type {Backbone.View}
     * @private
     */
    this.trailController_ = options.trailController;


    /**
     * Controller for the trailhead marker.
     *
     * @type {Backbone.View}
     * @private
     */
    this.trailheadController_ = options.trailheadController;


    /**
     * The data model representing a single trail
     * object returned from the Polaris PublicTrails API.
     *
     * @type {aeris.Model}
     * @private
     */
    this.trail_ = options.trail;


    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     */
    this.eventHub_ = options.eventHub;


    StateModule.apply(this, arguments);

    this.addInitializer(this.renderControllers_);


    // Trigger 'trail:load' global event
    this.listenTo(this.trail_, 'sync', function() {
      var triggerArgs = ['route:load'].concat(_.argsToArray(arguments));
      this.eventHub_.trigger.apply(this.eventHub_, triggerArgs);
    });
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

    // Assign the trail data model
    // to the id specified in the builder options
    this.trail_.set('id', moduleOptions.trailId);

    // Render the trailController
    // with styles from the builder options
    this.trailController_.setStyle(moduleOptions.style || {});
    this.trailController_.render();

    // Render trailhead marker
    this.trailheadController_.render();

    // Fetch trail data
    this.trail_.fetch().
      fail(function(errResponse) {
        throw new ApiReponseError(errResponse.description || 'Failed to fetch trail data.');
      });
  };


  return RouteDetailsModule;
});

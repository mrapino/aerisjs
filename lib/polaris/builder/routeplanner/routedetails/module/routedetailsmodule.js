define([
  'aeris/util',
  'mapbuilder/core/module/statemodule',
  'api/params/collection/chainedquery',
  'aeris/errors/apiresponseerror'
], function(_, StateModule, ChainedQuery, ApiResponseError) {
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
     * The data model representing a single trail
     * object returned from the Polaris PublicTrails API.
     *
     * @type {aeris.Model}
     * @private
     */
    this.trail_ = options.trail;


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
     * The data collection representing a set
     * of public waypoints for our trail.
     *
     * @type {aeris.Collection}
     * @private
     */
    this.trailWaypointCollection_ = options.trailWaypointCollection;


    /**
     * Controller for the Public Waypoint
     * marker collection view.
     *
     * @type {*}
     * @private
     */
    this.trailWaypointsController_ = options.trailWaypointsController;


    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     */
    this.eventHub_ = options.eventHub;


    StateModule.apply(this, arguments);

    this.addInitializer(this.prepareDataModels_);
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

    // Render the trailController
    // with styles from the builder options
    this.trailController_.setStyle(moduleOptions.style || {});
    this.trailController_.render();

    // Render trailhead marker
    this.trailheadController_.render();

    // Render trail waypoints
    //this.trailWaypointsController_.render();
  };


  /**
   * @param {aeris.Model} builderOptions
   * @private
   */
  RouteDetailsModule.prototype.prepareDataModels_ = function(builderOptions) {
    var moduleOptions = builderOptions.get('routeDetails');

    // Assign the trail data model
    // to the id specified in the builder options
    this.trail_.set('id', moduleOptions.trailId);

    // Assign the trail waypoint collection
    // to our route id.
    this.trailWaypointCollection_.setParams({
      query: new ChainedQuery([{
        property: 'routeid',
        value: moduleOptions.trailId,
        operator: 'AND'
      }])
    }, { validate: true });


    // Fetch trail data
    this.trail_.fetch().
      fail(function(errResponse) {
        throw new ApiResponseError(errResponse.description || 'Failed to fetch trail data.');
      });

    // Fetch trail waypoints data
    this.trailWaypointCollection_.fetch().
      fail(function(errResponse) {
        throw new ApiResponseError(errResponse.description || 'Failed to fetch trail waypoints.');
      });
  };


  return RouteDetailsModule;
});

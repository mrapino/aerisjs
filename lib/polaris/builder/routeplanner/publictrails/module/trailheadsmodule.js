define([
  'aeris/util',
  'mapbuilder/core/module/statemodule',
  'polaris/api/endpoint/config/validfilters'
], function(_, StateModule, validFilters) {
  /**
   * Manages trail-head point data for Polaris Public trails.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.module.TrailHeadsModule
   * @extends aeris.builder.maps.core.modules.StateModule
   *
   * @constructor
   * @override
   *
   * @param {Backbone.View} options.controlsController Required.
   * @param {Backbone.View} options.trailheadsController Required.
   * @param {aeris.Events} options.eventHub Required.
  */
  var TrailHeadsModule = function(options) {
    /**
     * Controller for Public Trails UI controls
     *
     * @type {Backbone.View}
     * @private
     */
    this.controlsController_ = options.controlsController;


    /**
     * Controller for Trailhead marker views.
     *
     * @type {Backbone.View}
     * @private
     */
    this.trailheadsController_ = options.trailheadsController;


    /**
     * @type {aeris.application.controller.ControllerInterface}
     * @private
     */
    this.TrailInfoController_ = options.TrailInfoController;


    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     */
    this.eventHub_ = options.eventHub;


    StateModule.apply(this, arguments);


    this.addInitializer(this.renderControllers_);
  };
  _.inherits(TrailHeadsModule, StateModule);


  /**
   * Render controllers for this module.
   */
  TrailHeadsModule.prototype.renderControllers_ = function(builderOptions) {
    this.trailheadsController_.render();

    if (builderOptions.getAtPath('controls.publicTrails')) {
      this.eventHub_.trigger('mapControls:ready', this.controlsController_, 'publicTrails');
    }
  };

  /** @param {aeris.Model} trail */
  TrailHeadsModule.prototype.renderTrailInfo = function(trail) {
    var infoView = new this.TrailInfoController_({
      model: trail
    });

    this.eventHub_.trigger('info:view', infoView);
  };


  /**
   * @override
   */
  TrailHeadsModule.prototype.registerState_ = function() {
    this.appState_.set('trailHeads', this.moduleState_);
  };


  /**
   * @override
   */
  TrailHeadsModule.prototype.populateState_ = function(builderOptions) {
    var moduleStateObjects;
    var moduleOptions = builderOptions.get('publicTrails');

    moduleStateObjects = this.processBuilderOptions_(moduleOptions);

    this.moduleState_.set(moduleStateObjects);
  };


  /**
   * Updates our module state
   * with options from the app builder config.
   *
   * @param {Object} moduleOptions
   *
   * @return {Object} Attributes to set on module state
   * @private
   */
  TrailHeadsModule.prototype.processBuilderOptions_ = function(moduleOptions) {
    var filterToggles = _.map(validFilters.trails, function(filter) {
      return {
        value: filter,
        // Mark filter as selected
        // if it's defined in the module options.
        selected: _(moduleOptions.trailTypes).contains(filter)
      };
    });

    return {
      name: 'TrailheadMarkers',
      class: 'TrailheadMarkers',
      selected: moduleOptions.default,
      filters: filterToggles
    }
  };


  return TrailHeadsModule;
});

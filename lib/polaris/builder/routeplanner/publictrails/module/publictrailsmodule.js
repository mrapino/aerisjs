define([
  'aeris/util',
  'mapbuilder/core/module/statemodule',
  'polaris/api/endpoint/config/validfilters'
], function(_, StateModule, validFilters) {
  /**
   * Polaris Public trails.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.module.PublicTrailsModule
   * @extends aeris.builder.maps.core.modules.StateModule
   *
   * @constructor
   * @override
   *
   * @param {Backbone.View} options.controlsController Required.
   * @param {Backbone.View} options.trailheadsController Required.
   * @param {aeris.Events} options.eventHub Required.
  */
  var PublicTrailsModule = function(options) {
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
     * Application event hub.
     *
     * @type {aeris.Events}
     * @private
     */
    this.eventHub_ = options.eventHub;


    StateModule.apply(this, arguments);


    this.addInitializer(this.renderControllers_);
  };
  _.inherits(PublicTrailsModule, StateModule);


  PublicTrailsModule.prototype.renderControllers_ = function(builderOptions) {
    this.trailheadsController_.render();

    if (builderOptions.getAtPath('controls.publicTrails')) {
      this.eventHub_.trigger('mapControls:render', this.controlsController_.render(), 'publicTrails');
    }
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
  PublicTrailsModule.prototype.processBuilderOptions_ = function(moduleOptions) {
    var filterToggles = _.map(validFilters.trails, function(filter) {
      return {
        value: filter,
        // Mark filter as selected
        // if it's defined in the module options.
        selected: _(moduleOptions.filters).contains(filter)
      };
    });

    return {
      name: 'TrailheadMarkers',
      class: 'TrailheadMarkers',
      selected: moduleOptions.default,
      filters: filterToggles
    }
  };


  return PublicTrailsModule;
});

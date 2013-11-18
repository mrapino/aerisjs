define([
  'aeris/util',
  'mapbuilder/core/module/statemodule',
  'aeris/errors/invalidconfigerror'
], function(_, StateModule, InvalidConfigError) {
  /**
   * Manages [olaris public trail layers.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.module.TrailLayersModule
   * @extends aeris.builder.maps.core.module.StateModule
   *
   * @constructor
   * @override
   *
   * @param {Backbone.View} options.trailLayersController Required.
  */
  var TrailLayersModule = function(options) {

    /**
     * Controller for trail layers {aeris.maps.MapObject} view.
     *
     * @type {Backbone.View}
     * @private
     */
    this.trailLayersController_ = options.trailLayersController;


    StateModule.apply(this, arguments);


    this.addInitializer(this.renderControllers_);
  };
  _.inherits(TrailLayersModule, StateModule);


  /**
   * Render controllers for this module.
   */
  TrailLayersModule.prototype.renderControllers_ = function(builderOptions) {
    this.trailLayersController_.render();
  };


  /**
   * @override
   */
  TrailLayersModule.prototype.registerState_ = function() {
    this.appState_.set('trailLayers', this.moduleState_);
  };


  /**
   * @override
   */
  TrailLayersModule.prototype.populateState_ = function(builderOptions) {
    var moduleStateObjects;
    var moduleOptions = builderOptions.get('publicTrails');

    moduleStateObjects = this.processBuilderOptions_(moduleOptions);

    this.moduleState_.set(moduleStateObjects);
  };


  /**
   * Creates state objects
   * for each trails layer specified in
   * app builder config.
   *
   * @override
   */
  TrailLayersModule.prototype.processBuilderOptions_ = function(moduleOptions) {
    // Lookup layer class names
    // from trailTypes options.
    var layerClassLookup = {
      snow: 'SnowTrailsLayer',
      orv: 'ORVTrailsLayer',
      indian: 'IndianTrailsLayer',
      victory: 'VictoryTrailsLayer'
    };

    var validateType = function(type) {
      if (!layerClassLookup[type]) {
        throw new InvalidConfigError('\'' + type + '\' is not a valid' +
          ' trail type. Valid trail types are: ' +
          _.keys(layerClassLookup).join(', '));
      }
    };

    _.each(moduleOptions.trailTypes, validateType, this);


    return _.map(moduleOptions.trailTypes, function(type) {
      return {
        name: layerClassLookup[type],
        class: layerClassLookup[type],
        selected: moduleOptions.default
      }
    }, this);
  };


  return TrailLayersModule;
});

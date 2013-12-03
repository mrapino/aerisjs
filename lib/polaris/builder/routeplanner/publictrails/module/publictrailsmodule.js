define([
  'aeris/util',
  'application/module/module'
], function(_, Module) {
  /**
   * The public trails module.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.module.PublicTrailsModule
   * @extends aeris.application.module.Module
   *
   * @constructor
   * @override
  */
  var PublicTrailsModule = function(options) {

    /**
     * A combo toggle, controlling
     * the state of all MapObject views.
     *
     * @type {aeris.application.form.model.ComboToggle}
     * @private
     */
    this.comboState_ = options.comboState;


    /**
     * The state of the trail head markers.
     *
     * @type {aeris.builder.maps.core.model.MapObjectToggle}
     * @private
     */
    this.trailHeadState_ = options.trailHeadState;


    /**
     * The state of the trail layers.
     *
     * @type {aeris.builder.maps.core.collection.MapObjectToggleCollection}
     * @private
     */
    this.trailLayersStateCollection_ = options.trailLayersStateCollection;


    Module.apply(this, arguments);


    this.addInitializer(this.populateComboState_);
  };
  _.inherits(PublicTrailsModule, Module);


  /**
   * Populate the combo state with our
   * component map object states.
   *
   * @private
   */
  PublicTrailsModule.prototype.populateComboState_ = function() {
    this.comboState_.addToggles([this.trailHeadState_]);
    this.comboState_.addToggles(this.trailLayersStateCollection_);
  };


  return PublicTrailsModule;
});

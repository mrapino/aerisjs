define([
  'aeris/util',
  'aeris/application/forms/models/toggle',
  'aeris/collection',
  'aeris/errors/validationerror'
], function(_, Toggle, Collection, ValidationError) {
  /**
   * Acts as a combined toggle for a set of child toggles.
   * Selecting/deselected a ComboToggle will cause all child
   * toggles to be selected/deselected.
   *
   * Useful for delegating control over several child Toggle models
   * to a master ComboToggle model.
   *
   * Example:
   *  var lights = new Toggle();
   *  var camera = new Toggle();
   *  var action = new ComboToggle({
   *    childToggles: [lights, camera]
   *  });
   *
   *  action.select();    // lights and camera are selected
   *  action.deselect();  // lights and camera are deselected
   *
   *
   * @class ComboToggle
   * @namespace aeris.application.forms.models
   * @extends aeris.application.forms.models.Toggle
   *
   * @constructor
   * @override
   *
   * @param {string=} opt_options.childTogglesAttribute
   */
  var ComboToggle = function(opt_attrs, opt_options) {
    var options = _.defaults(opt_options || {}, {
      childTogglesAttribute: 'childToggles'
    });

    var attrs = opt_attrs || {};


    /**
     * The name of the combo toggle.
     *
     * @attribute value
     * @type {string}
     */
    /**
     * Array of toggles to be controlled
     * by the ComboToggle.
     *
     * @attribute childToggles
     * @type {Array.<aeris.application.forms.models.Toggle>}
     */


    /**
     * The attribute which references
     * the toggles to be controlled by the
     * ComboToggle.
     *
     * @type {string}
     * @default 'childToggles'
     * @private
     * @property childTogglesAttribute_
     */
    this.childTogglesAttribute_ = options.childTogglesAttribute;

    attrs[this.childTogglesAttribute_] || (attrs[this.childTogglesAttribute_] = []);


    Toggle.call(this, attrs, options);


    // Bind ComboToggle to child Toggles
    this.controlChildToggles_();
    this.updateChildTogglesState_();
  };
  _.inherits(ComboToggle, Toggle);


  /**
   * @method validate
   */
  ComboToggle.prototype.validate = function(attrs) {
    if (attrs[this.childTogglesAttribute_] && !this.isValidToggles(attrs[this.childTogglesAttribute_])) {
      return new ValidationError(this.childTogglesAttribute, 'Child toggles attribute' +
        'must be an array of Toggle models');
    }
  };


  /**
   * Validates an array of Toggle models.
   *
   * @param {*} toggles
   * @return {Boolean}
   * @method isValidToggles
   */
  ComboToggle.prototype.isValidToggles = function(toggles) {
    var isValid = true;

    if (!_.isArray(toggles)) { return false; }

    _.each(toggles, function(toggle) {
      if (!(toggle instanceof Toggle)) {
        isValid = false;
      }
    }, this);

    return isValid;
  };


  /**
   * @private
   * @method controlChildToggles_
   */
  ComboToggle.prototype.controlChildToggles_ = function() {
    var events = [
      'change:selected',
      'change:' + this.childTogglesAttribute_
    ];

    this.listenTo(this, events.join(' '), this.updateChildTogglesState_);
  };


  /**
   * @private
   * @method updateChildTogglesState_
   */
  ComboToggle.prototype.updateChildTogglesState_ = function() {
    var selectMethod = this.isSelected() ? 'select' : 'deselect';
    this.invokeAll_(selectMethod);
  };


  /**
   * Invoke a method on all
   * child toggles.
   *
   * @param {string} method
   * @param {...*} var_args
   * @private
   * @method invokeAll_
   */
  ComboToggle.prototype.invokeAll_ = function(method, var_args) {
    var invokeWithArgs = Array.prototype.slice.call(arguments, 0);
    _.invoke.apply(_, [this.getChildToggles()].concat(invokeWithArgs));
  };


  /**
   * @return {Array.<aeris.application.models.Toggle>}
   * @method getChildToggles
   */
  ComboToggle.prototype.getChildToggles = function() {
    return this.get(this.childTogglesAttribute_);
  };


  /**
   * Add a set of toggles to the combo toggle,
   * to be controlled as child toggles.
   *
   * @param {Array.<Toggle>|aeris.application.forms.collections.ToggleCollection} toggles
   * @method addToggles
   */
  ComboToggle.prototype.addToggles = function(toggles) {
    var uniqueToggles, newChildTogglesSet;

    // Normalize ToggleCollection as array
    toggles = this.normalizeCollectionAsArray_(toggles);

    uniqueToggles = _.difference(toggles, this.getChildToggles());
    newChildTogglesSet = this.getChildToggles().concat(uniqueToggles);

    this.set(this.childTogglesAttribute_, newChildTogglesSet);
  };


  /**
   * @private
   * @param {aeris.Collection|Array.<aeris.Model>} collectionOrArray
   * @return {Array.<aeris.Model>}
   * @private
   * @method normalizeCollectionAsArray_
   */
  ComboToggle.prototype.normalizeCollectionAsArray_ = function(collectionOrArray) {
    return (collectionOrArray instanceof Collection) ? collectionOrArray.models : collectionOrArray;
  };


  /**
   * @method clearToggles
   */
  ComboToggle.prototype.clearToggles = function() {
    this.set(this.childTogglesAttribute_, []);
  };


  return ComboToggle;
});

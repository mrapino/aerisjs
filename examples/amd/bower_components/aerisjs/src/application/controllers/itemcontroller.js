define([
  'aeris/util',
  'marionette',
  'aeris/application/controllers/mixins/viewmixin',
  'aeris/application/controllers/templatehelperregistrars/handlebarstemplatehelperregistrar'
], function(_, Marionette, ViewMixin, HandlebarsTemplateHelperRegistrar) {
  /**
   * An aeris extension of a Marionette.ItemView
   *
   * @class ItemController
   * @namespace aeris.application.controllers
   * @extends Marionette.ItemView
   * @uses aeris.application.controllers.ViewMixin
   * @implements aeris.application.controllers.ControllerInterface
   *
   * @constructor
   * @override
   *
   * @param {Object.<string,string>=} opt_options.ui See Marionette.ItemView#ui.
   * @param {Object.<string,string>=} opt_options.events See Marionette.ItemView#events.
   */
  var ItemController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      ui: {},
      events: {}
    });

    /**
     * See Marionette.ItemView#ui.
     *
     * @type {Object.<string,string>}
     * @property ui
     */
    this.ui = _.defaults(options.ui, this.ui);


    /**
     * See Marionette.ItemView#events.
     *
     * @type {Object.<string,string>}
     * @property events
     */
    this.events = _.defaults(options.events, this.events);


    /**
     * @type {aeris.application.controllers.templatehelperregistrars.TemplateHelperRegistrarInterface}
     * @private
     * @property templateHelperService_
     */
    this.templateHelperService_ = options.templateHelperService_ || new HandlebarsTemplateHelperRegistrar();

    Marionette.ItemView.call(this, options);
    ViewMixin.call(this, options);


    // Transition on render
    this.listenTo(this, 'render', function() {
      this.trigger('before:transition:in');
      this.transitionIn_();
      this.trigger('transition:in');
    });


    /**
     * @event before:transition:in
     */
    /**
     * @event transition:in
     */
    /**
     * @event before:transition:out
     */
    /**
     * @event transition:out
     */
  };
  _.inherits(ItemController, Marionette.ItemView);
  _.extend(ItemController.prototype, ViewMixin);


  /**
   * Custom remove logic,
   * including transition behavior.
   *
   * Override transition behavior using `transitionOut_`
   *
   * @override
   * @method close
   */
  ItemController.prototype.close = function() {
    this.trigger('before:transition:out');
    this.transitionOut_(undefined, function() {
      Marionette.ItemView.prototype.close.call(this);
      this.trigger('transition:out');
    }, this);
  };


  /**
   * Transition in the view.
   *
   * Override to define custom transition logic.
   *
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback.
   *
   * @chainable
   * @protected
   * @method transitionIn_
   */
  ItemController.prototype.transitionIn_ = function(opt_duration, opt_cb, opt_ctx) {
    this.$el.hide();

    this.transitionUsing_('fadeIn', opt_duration, opt_cb, opt_ctx);

    return this;
  };


  /**
   * Transition out the view.
   *
   * Override to define custom transition logic.
   *
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback.
   *
   * @chainable
   * @protected
   * @method transitionOut_
   */
  ItemController.prototype.transitionOut_ = function(opt_duration, opt_cb, opt_ctx) {
    this.transitionUsing_('fadeOut', opt_duration, opt_cb, opt_ctx);

    return this;
  };


  /**
   * Run a jQuery animation on view element.
   *
   * @param {string} method jQuery animation method name.
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback.
   *
   * @chainable
   * @protected
   * @method transitionUsing_
   */
  ItemController.prototype.transitionUsing_ = function(method, opt_duration, opt_cb, opt_ctx) {
    var duration = _.isUndefined(opt_duration) ? 0 : opt_duration;
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    // Using `defer` clears the call stack
    // before running the animation,
    // and seems to clean up some clunky
    // Marionette onRender/onClose transition behavior.
    _.defer(function() {
      this.$el[method](duration, _.bind(cb, ctx));
    }.bind(this));

    return this;
  };





  return ItemController;
});

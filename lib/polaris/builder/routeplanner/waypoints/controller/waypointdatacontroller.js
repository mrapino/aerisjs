define([
  'aeris/util',
  'mapbuilder/markers/controller/markerdatacontroller',
  'aeris/util/jquery/autoheight'
], function(_, MarkerDataController) {
  /**
   * Controls the Waypoint details view.
   *
   * @class aeris.polaris.builder.waypoints.controller.WaypointDataController
   * @extends aeris.builder.maps.markers.controller.MarkerDataController
   *
   * @constructor
   * @override
   *
   * @param {Object} opt_options.ui
   */
  var WaypointDataController = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      ui: {},
      events: {}
    });

    /**
     * UI definitions may be injected for:
     *    header
     *    revealBtn
     *
     * @property ui
     * @type {Object}
     * @override
     */
    options.ui = _.defaults(options.ui, {
      header: '',
      revealBtn: ''
    });

    options.events['click ' + options.ui.revealBtn] = function() {
      this.transitionToFull_();
    };


    MarkerDataController.call(this, opt_options);
  };
  _.inherits(WaypointDataController, MarkerDataController);


  /**
   * Slide up summary view
   *
   * @override
   */
  WaypointDataController.prototype.transitionIn_ = function(opt_duration, opt_cb, opt_ctx) {
    this.transitionToSummary_(opt_duration,  opt_cb, opt_ctx);

    return this;
  };


  /**
   * Transition to show the entire view.
   *
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback
   *
   * @chainable
   * @protected
   */
  WaypointDataController.prototype.transitionToFull_ = function(opt_duration, opt_cb, opt_ctx) {
    var duration = _.isUndefined(opt_duration) ? 200 : opt_duration;
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    var tweak = 20;   // Because we're just not quite there....
    var targetPosition = 0;
    var hiddenPosition = 0 - this.$el.getAutoHeight() - tweak;
    var startingPosition = this.$el.is(':visible') ? this.$el.css('bottom') : hiddenPosition;

    _.defer(function () {
      this.$el.
        show().
        css('bottom', startingPosition).
        animate({
          bottom: targetPosition
        }, duration, 'swing', _.bind(cb, ctx));
    }, this);

    return this;
  };


  /**
   * Transition to show the summary (header only) view
   *
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback
   *
   * @chainable
   * @protected
   */
  WaypointDataController.prototype.transitionToSummary_ = function(opt_duration, opt_cb, opt_ctx) {
    var duration = _.isUndefined(opt_duration) ? 200 : opt_duration;
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    var tweak = 20;   // Because we're just not quite there....
    var targetPosition = 0 - this.ui.header.getAutoHeight() - tweak;
    var hiddenPosition = 0 - this.$el.getAutoHeight() - tweak;
    var startingPosition = this.$el.is(':visible') ? this.$el.css('bottom') : hiddenPosition;

    this.$el.hide();

    _.defer(function () {
      this.$el.
        show().
        css('bottom', startingPosition).
        animate({
          bottom: targetPosition
        }, duration, 'swing', _.bind(cb, ctx));
    }, this);

    return this;
  };


  /**
   * @override
   */
  WaypointDataController.prototype.transitionOut_ = function(opt_duration, opt_cb, opt_ctx) {
    this.transitionUsing_('slideUp', opt_duration, opt_cb, opt_ctx);

    return this;
  };


  Wa


  return WaypointDataController;
});

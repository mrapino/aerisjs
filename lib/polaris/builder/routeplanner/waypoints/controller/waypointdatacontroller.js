define([
  'aeris/util',
  'mapbuilder/markers/controller/markerdatacontroller',
  'aeris/util/jquery/autoheight',
  'vendor/jquery/dragEvent'
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
     *    hideBtn
     *    dragHandle
     *
     * @property ui
     * @type {Object}
     * @override
     */
    options.ui = _.defaults(options.ui, {
      header: '',
      revealBtn: '',
      hideBtn: '',
      dragHandle: ''
    });

    // Bind revealBtn click
    options.events['click ' + options.ui.revealBtn] = function() {
      this.transitionToFull_();
      return false;
    };

    // Bind hideBtn click
    options.events['click ' + options.ui.hideBtn] = function() {
      this.transitionToSummary_();
      return false;
    };

    options.events['drag ' + options.ui.dragHandle] = this.handleDrag_;
    options.events['dragstart ' + options.ui.dragHandle] = function() {
      this.baseDragPosition_ = parseInt(this.$el.css('bottom')) * -1;
    };


    MarkerDataController.call(this, opt_options);


    // Switch reveal/hide btns on transition
    this.listenTo(this, {
      'before:transition:summary': function() {
        this.ui.revealBtn.show();
        this.ui.hideBtn.hide();
      },
      'before:transition:full': function() {
        this.ui.revealBtn.hide();
        this.ui.hideBtn.show();
      }
    });

    /**
     * @event before:transition:summary
     */
    /**
     * @event transition:summary
     */
    /**
     * @event before:transition:full
     */
    /**
     * @event transition:full
     */
  };
  _.inherits(WaypointDataController, MarkerDataController);



  WaypointDataController.prototype.handleDrag_ = function(evt, dragEvt) {
    var maxPosition = this.$el.getAutoHeight();
    var minPosition = 0;
    var newPosition;

    // Set the original view position
    // (only on the first drag event)
    dragEvt.positionOrig || (dragEvt.positionOrig = parseInt(this.$el.css('bottom')) * -1);

    // Position = change in vertical mouse position + original view position;
    newPosition = dragEvt.positionOrig + dragEvt.deltaY;

    // Limit by min/max
    if (newPosition >= maxPosition) {
      this.transitionOut_();
      return false;
    }
    if (newPosition <= minPosition) {
      this.transitionToFull_();
      return false
    }

    this.$el.css('bottom', newPosition * -1);
  };


  /**
   * Slide up summary view
   *
   * @override
   */
  WaypointDataController.prototype.transitionIn_ = function(opt_duration, opt_cb, opt_ctx) {
    this.$el.hide();

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
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    this.trigger('before:transition:full');

    this.slideTo_(0, opt_duration, function() {
      this.trigger('transition:full');
      cb.call(ctx);
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
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    this.trigger('before:transition:summary');

    this.slideTo_(this.ui.header.getAutoHeight() + 60, opt_duration, function() {
      this.trigger('transition:summary');
      cb.call(ctx);
    }, this);

    return this;
  };


  /**
   * @override
   */
  WaypointDataController.prototype.transitionOut_ = function(opt_duration, opt_cb, opt_ctx) {
    this.slideTo_(this.$el.getAutoHeight() + 40, opt_duration, opt_cb, opt_ctx);

    return this;
  };


  /**
   * Slide to reveal a specified number of
   * view pixels in height.
   *
   * @param {number} position Pixels of the view to reveal.
   * @param {number} opt_duration Animation duration, in milliseconds.
   * @param {Function=} opt_cb Callback. Invoked when transition is complete.
   * @param {Object=} opt_ctx Context for callback
   *
   * @chainable
   * @protected
   */
  WaypointDataController.prototype.slideTo_ = function(position, opt_duration, opt_cb, opt_ctx) {
    var duration = _.isUndefined(opt_duration) ? 200 : opt_duration;
    var cb = opt_cb || function() {};
    var ctx = opt_ctx || this.el;

    var hiddenPosition = 0 - this.$el.getAutoHeight() - 20;
    var startingPosition = this.$el.is(':visible') ? this.$el.css('bottom') : hiddenPosition;
    var targetPostion = 0 - position;

    _.defer(function () {
      this.$el.
        show().
        css('bottom', startingPosition).
        animate({
          bottom: targetPostion
        }, duration, 'swing', _.bind(cb, ctx));
    }, this);

    return this;
  };


  return WaypointDataController;
});

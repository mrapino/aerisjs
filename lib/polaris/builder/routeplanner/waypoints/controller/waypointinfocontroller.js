define([
  'aeris/util',
  'mapbuilder/markers/controller/markerinfocontroller',
  'aeris/util/jquery/autoheight',
  'vendor/jquery/dragEvent'
], function(_, MarkerInfoController, $) {
  /**
   * Controls the Waypoint details view.
   *
   * @class aeris.polaris.builder.waypoints.controller.WaypointInfoController
   * @extends aeris.builder.maps.markers.controller.MarkerInfoController
   *
   * @constructor
   * @override
   *
   * @param {Object} opt_options.ui
   */
  var WaypointInfoController = function(opt_options) {
    MarkerInfoController.call(this, opt_options);

    this.declareUI([
      'content',
      'toggleSwitch'
    ]);
  };
  _.inherits(WaypointInfoController, MarkerInfoController);


  /**
   * @override
   */
  WaypointInfoController.prototype.transitionIn_ = function(opt_duration, opt_cb, opt_ctx) {
    var duration = _.isUndefined(opt_duration) ? 150 : opt_duration;
    var ctx = opt_ctx || this;
    var cb = opt_cb || function() {};

    this.ui.content.hide().fadeIn(duration, 'linear');
    this.ui.toggleSwitch.hide().fadeIn(duration, 'linear', _.bind(cb, ctx));
  };


  /**
   * @override
   */
  WaypointInfoController.prototype.transitionOut_ = function(opt_duration, opt_cb, opt_ctx) {
    var duration = opt_duration || 200;
    var ctx = opt_ctx || this;
    var cb = opt_cb || function() {};

    this.ui.content.slideUp(duration * 0.5);
    this.ui.toggleSwitch.fadeOut(duration, _.bind(cb, this));
  };


  return WaypointInfoController;
});

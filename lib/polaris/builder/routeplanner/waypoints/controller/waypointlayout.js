define([
  'aeris/util',
  'mapbuilder/markers/controller/markerlayout',
  'aeris/errors/invalidconfigerror'
], function(_, MarkerLayout, InvalidConfigError) {
  /**
   *
   * @class aeris.polaris.builder.routeplanner.waypoints.controller.WaypointLayout
   * @extends aeris.builder.maps.markers.controller.MarkerLayout
   *
   * @constructor
   * @override
   *
   * @param {aeris.builder.core.collection.MapObjectStateCollection} options.moduleState Required.
   */
  var WaypointLayout = function(options) {
    /**
     * Waypoints Module state.
     *
     * @type {aeris.builder.maps.core.collection.MapObjectStateCollection}
     * @private
     */
    this.moduleState_ = options.moduleState;


    /**
     * Controller for the Waypoints menu view.
     *
     * @type {Backbone.View}
     * @private
     */
    this.menuController_ = options.menuController;


    MarkerLayout.apply(this, arguments);


    this.listenTo(this, {
      render: this.populateMenuController_
    });
  };
  _.inherits(WaypointLayout, MarkerLayout);


  /**
   * Populate the menu controller
   * with menuItem models from
   * the WaypointModule state.
   *
   * Resolve references to named filters
   * as filter toggle models within the module state.
   *
   * @private
   */
  WaypointLayout.prototype.populateMenuController_ = function() {
    var menuItemModels = [];


    this.moduleState_.each(function(waypointState) {

      // Resolve filter names to actual references
      // within the module state.
      var models = _.map(waypointState.get('menuItems'), function(menuItem) {
        return _.extend(menuItem, {
          filters: _.map(menuItem.filters, function(filterName) {
            var filterModel = waypointState.get('filters').get(filterName);

            if (!filterModel) {
              throw new InvalidConfigError('\'' + filterName + '\'' +
                ' is not a valid ' + waypointState.id + ' filter.');
            }

            return filterModel;
          }, this)
        })
      }, this);

      menuItemModels = menuItemModels.concat(models);
    }, this);

    // Add models to menu controller
    this.menuController_.collection.add(menuItemModels);
  };


  return WaypointLayout;
});

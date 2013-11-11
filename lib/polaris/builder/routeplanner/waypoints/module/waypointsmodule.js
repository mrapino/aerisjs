define([
  'aeris/util',
  'mapbuilder/markers/module/markersmodule'
], function(_, MarkersModule) {
  /**
   *
   * @class aeris.polaris.builder.routeplanner.markers.module.WaypointsModule
   * @extends aeris.builder.maps.markers.module.MarkersModule
   *
   * @constructor
   * @override
   *
   * @param {aeris.application.controller.LayoutController} options.moduleController
   */
  var WaypointsModule = function(options) {
    MarkersModule.apply(this, arguments);

    this.addInitializer(this.populateMenuController_);
  };
  _.inherits(WaypointsModule, MarkersModule);


  /**
   * Include menuItems config in app module state.
   *
   * @override
   */
  WaypointsModule.prototype.processMapObjectOption_ = function(mapObjectOptions) {
    var mapObjectState = MarkersModule.prototype.processMapObjectOption_.apply(this, arguments);
    var menuItemModels = [];

    // Convert menuItems to ComboFilterModels
    _.each(mapObjectOptions.menuItems, function(filterNames, menuItemName) {
      menuItemModels.push({
        value: menuItemName,
        filters: filterNames
      });
    }, this);

    return _.extend(mapObjectState, {
      menuItems: menuItemModels
    });
  };


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
  WaypointsModule.prototype.populateMenuController_ = function() {

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
    this.controlsController_.collection.add(menuItemModels);
  };


  return WaypointsModule;
});

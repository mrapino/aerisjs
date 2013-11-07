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


  return WaypointsModule;
});

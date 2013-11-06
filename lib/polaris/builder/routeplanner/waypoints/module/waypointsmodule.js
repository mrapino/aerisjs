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
   */
  var WaypointsModule = function() {
    MarkersModule.apply(this, arguments);
  };
  _.inherits(WaypointsModule, MarkersModule);


  /**
   * Render Waypoints menu, with combo-filter controls.
   *
   * @override
   */
  WaypointsModule.prototype.renderControls_ = function(mapObjectOptions) {
    var collectionData = [];

    _.each(mapObjectOptions.menuItems, function(itemFilters, itemName) {
      // Formed as:
      //    name: (Name of the menu item ~label),
      //    filters: (One or more filters to toggle with menu item select)
      collectionData.push({
        name: itemName,
        filters: itemFilters
      });

      // Prep controls controller with
      // comboFilterToggle data
      this.controlsController_.collection.add(collectionData);

      // Let our parent class handle rendering.
      MarkersModule.prototype.renderControls_.apply(this, arguments);
    });
  };


  return WaypointsModule;
});

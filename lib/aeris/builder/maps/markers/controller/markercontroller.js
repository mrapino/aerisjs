define([
  'aeris/util',
  'mapbuilder/core/controller/mapobjecttogglecontroller'
], function(_, MapObjectToggleController) {
  /**
   * Controls {aeris.maps.markercollections.PointDataMarkerCollection} views.
   *
   * @class aeris.builder.maps.markers.controller.MarkerController
   * @extends aeris.builder.core.controller.MapObjectToggleController
   *
   * @constructor
   * @override
   *
   * @param {aeris.builder.maps.markers.model.MarkerToggle} options.model Required.
   * @param {aeris.Events} options.eventHub Required.
   */
  var MarkerController = function(options) {
    /**
     * Application event hub.
     *
     * @type {aeris.Events}
     * @protected
     */
    this.eventHub_ = options.eventHub;


    MapObjectToggleController.call(this, options);

    this.listenTo(this, {
      render: this.updateFilters_
    });


    // Bind to map view events
    this.listenTo(this, {
      render: this.bindMapViewEvents_
    })
  };
  _.inherits(MarkerController, MapObjectToggleController);


  /**
   * Zoom in and center on a marker.
   *
   * @param {aeris.maps.Marker} marker
   */
  MarkerController.prototype.zoomToMarker = function(marker) {
    var mapOptions = this.appState_.get('mapOptions');

    if (mapOptions.get('zoom') < 13) {
      mapOptions.set({
        center: marker.getPosition(),
        zoom: 13
      }, { validate: true });
    }
  };


  MarkerController.prototype.onRender = function() {
    if (MapObjectToggleController.prototype.onRender) {
      MapObjectToggleController.prototype.onRender.apply(this, arguments);
    }

    this.view_.fetchData().
      fail(function(errRes) {
        throw errRes.description || 'Unable to fetch waypoint data.';
      });
  };


  /**
   * Update the api filters on the markers,
   * to match the application state's filters.
   *
   * @private
   */
  MarkerController.prototype.updateFilters_ = function() {
    var activeFilters, filterNames;

    // Can't do nothing if we have no view.
    if (!this.view_) { return; }

    // If there are no filters defined,
    // leave well enought alone
    if (!this.model.get('filters').length) { return; }

    activeFilters = this.model.get('filters').getSelected();
    filterNames = _.map(activeFilters, function(filterModel) {
      return filterModel.id;
    }, this);

    // No filters selected,
    // --> turn off marker
    if (!activeFilters.length && this.model.get('filters').length) {
      this.model.deselect();
      return;
    }

    this.resetFilter_(filterNames);
  };


  /**
   * Reset filter parameters.
   *
   * @param {Array.<string>} filters
   * @protected
   */
  MarkerController.prototype.resetFilter_ = function(filters) {
    if (!this.view_) { return; }

    this.view_.getParams().resetFilter(filters, { operator: 'OR' });
  };


  /**
   * Bind events to the map view.
   *
   * @private
   */
  MarkerController.prototype.bindMapViewEvents_ = function() {
    // Bind to filters
    if (this.model.get('filters')) {
      this.listenTo(this.model.get('filters'), {
        'add remove change:selected': this.updateFilters_,

        // Ensure that marker is selected, if a filter
        // is selected
        'select': _.bind(this.model.select, this.model)
      });
    }

    // Trigger 'marker:click' event
    this.listenTo(this.view_, {
      click: this.triggerClickEvent_
    });

    // Sync bounds data param to map bounds
    this.listenTo(this.map_, {
      'change:bounds': function() {
        this.view_.getParams().setBounds(this.map_.get('bounds'));
      }
    });

    // Fetch data when params change
    this.listenTo(this.view_.getParams(), 'change', function() {
      this.view_.fetchData();
    });
  };


  /**
   * Trigger an event
   * when the marker is clicked.
   *
   * @protected
   */
  MarkerController.prototype.triggerClickEvent_ = function(latLon, marker) {
    this.eventHub_.trigger('marker:click', latLon, marker);
  };


  return MarkerController;
});

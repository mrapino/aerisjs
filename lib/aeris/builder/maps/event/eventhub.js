define([
  'aeris/util',
  'aeris/events'
], function(_, Events) {
  /**
   * Application event hub
   *
   * @class aeris.builder.maps.event.EventHub
   * @extends aeris.Events
   */

  /**
   * @event 'marker:click'
   * @param {Array.<number>} latLon Marker location.
   * @param {aeris.maps.markers.PointDataMarker} marker Marker object.
   */
  /**
   * When a trail-head marker is clicked.
   * Polaris only.
   *
   * @event 'trailhead:click'
   * @param {Array.<number>} latLon Marker location.
   * @param {aeris.maps.markers.PointDataMarker} marker Marker object.
   */

  /**
   * An info view has been created,
   * and is available for rendering.
   *
   * @event 'info:view'
   * @param {Backbone.View} view
   */

  /**
   * A map controls view has been created
   * and is ready to be rendered.
   *
   * @event 'mapControls:ready'
   *
   * @param {Backbone.View} controller
   * @param {string} Name of the controller.
   */


  /**
   * A geolocation request has been made.
   *
   * @event 'geolocate:request'
   */
  /**
   * A geolocation request has been resolved successfully
   *
   * @event 'geolocate:success'
   * @param {Object} res Response to geolocation request.
   */
  /**
   * A geolocation request has been resolved with errors.
   *
   * @event 'geolocate:error'
   *
   * @param {Object} err Error response object.
   */
  /**
   * A geolocation request has been resolved (with or without errors).
   *
   * @event 'geolocate:complete'
   */

  /**
   * A geocode request has been made.
   *
   * @event 'geocode:request'
   * @param {string} location Location requested to geocode.
   */
  /**
   * A geocode request has been resolved successfully
   *
   * @event 'geocode:success'
   * @param {Object} res Response to geocode request.
   * @param {string} location Location requested to geocode.
   */
  /**
   * A geocode request has been resolved with errors.
   *
   * @event 'geocode:error'
   *
   * @param {Object} err Error response object.
   * @param {string} location Location requested to geocode.
   */
  /**
   * A geocode request has been resolved (with or without errors).
   *
   * @event 'geocode:complete'
   * @param {string} location Location requested to geocode.
   */
  return Events;
});

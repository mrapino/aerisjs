define([
  'aeris/util'
], function(_) {
  /**
   * Template helpers for a {aeris.polaris.api.endpoint.model.trail} model.
   */
  return function() {
    return {
      distanceInMiles: function() {
        var METERS_PER_MILE = 1609.34;
        var defaultDistance = 'Unknown';
        var isDistanceUnknown = _.isNull(this.trailDistance);
        var miles;

        if (isDistanceUnknown) { return defaultDistance; }

        miles = this.distance / METERS_PER_MILE;

        return miles.toFixed(1);
      },

      location: function() {
        var defaultLocation = 'unknown location';
        var isLocationUnknown = !this.place;

        if (isLocationUnknown) { return defaultLocation; }

        return this.place.name + ', ' + this.place.state;
      },

      openClosed: function() {
        var isClosed = _.path('openclose.isclosed', this);
        if (_.isUndefined(isClosed)) { return 'unknown'; }

        return isClosed ? 'closed' : 'open';
      }
    };
  };
});

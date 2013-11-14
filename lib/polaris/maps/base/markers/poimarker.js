define([
  'aeris/util',
  'aeris/config',
  'base/markers/pointdatamarker',
  'polaris/maps/base/markers/config/iconlookup'
], function(_, config, PointDataMarker, iconLookup) {
  /**
   * @class polaris.maps.markers.POIMarker
   * @extends aeris.maps.markers.PointDataMarker
   */
  var POIMarker = function(opt_attrs, opt_options) {
    var attrs = _.extend({
      url: config.get('path') + 'assets/poi.png'
    }, opt_attrs);

    var options = _.extend({
      iconPath: config.get('path') + 'assets/polaris-mocks/{name}.png',
      iconLookup: iconLookup.poi,
      typeAttribute: 'type'
    }, opt_options);

    PointDataMarker.call(this, attrs, options);
  };
  _.inherits(POIMarker, PointDataMarker);


  /**
   * Type attribute falls back to using
   * the service type attribute.
   *
   * @override
   */
  POIMarker.prototype.getType = function() {
    var type = PointDataMarker.prototype.getType.apply(this, arguments) || '';
    var serviceType;

    if (type && type.length) {
      return type;
    }

    // Try to find a type matching
    // the service.type attribute.
    serviceType = this.get('data').getAtPath('service.type') || '';

    _.each(this.iconLookup_, function(icon, iconType) {
      if (serviceType.match(new RegExp(iconType, 'i'))) {
        type = iconType;
      }
    }, this);

    return type;
  };


  /**
   * @override
   */
  POIMarker.prototype.getTitleFromData_ = function() {
    return this.get('data').getAtPath('service.name');
  };


  return POIMarker;
});

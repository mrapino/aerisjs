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
      iconPath: config.get('path') + 'assets/polaris/markers/small/{name}.png',
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
  POIMarker.prototype.lookupType_ = function() {
    var type = PointDataMarker.prototype.lookupType_.apply(this, arguments) || '';
    var serviceType;
    var isTypeAttrDefined = type && type.length;

    if (isTypeAttrDefined) {
      return type;
    }

    // Try to find a type matching
    // the service.type attribute.
    serviceType = this.getDataAttribute('service.type') || '';

    return this.findClosestMatchingType_(serviceType);
  };


  /**
   * Will attempt to find a iconType which
   * resembles the provided search term.
   *
   * @param {string} term
   * @returns {string|undefined} iconType described in this.iconLookup_.
   * @private
   */
  POIMarker.prototype.findClosestMatchingType_ = function(term) {
    var type;

    _.each(this.iconLookup_, function(icon, iconType) {
      var termResemblesType = term.match(new RegExp(iconType, 'i'));

      if (termResemblesType) {
        type = iconType;
      }
    }, this);

    return type;
  };


  /**
   * @override
   */
  POIMarker.prototype.lookupTitle_ = function() {
    return this.getDataAttribute('service.name') || this.get('title');
  };


  return POIMarker;
});

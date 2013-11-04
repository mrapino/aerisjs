define([
  'aeris/util',
  'api/params/model/filter'
], function(_, BaseFilter) {
  /**
   * Filter class specific to FourSquare-based APIs,
   * including the Aeris POI API.
   *
   * @class aeris.polaris.api.params.model.POIFilter
   * @extends aeris.api.params.model.Filter
   *
   * @constructor
   * @override
   */
  var POIFilter = function() {
    BaseFilter.apply(this, arguments);
  };
  _.inherits(POIFilter, BaseFilter);


  /**
   * @override
   */
  POIFilter.prototype.normalize_ = function(attrs) {
    attrs = BaseFilter.prototype.normalize_.apply(this, arguments);

    if (attrs.operator === 'OR') {
      if (console && console.warn) {
        console.warn('The Aeris POI API does not support ' +
          'filters using the \'OR\' opertor (semi-colon separated filters). ' +
          'Will submit request using \'AND\' operator (comma separated filters)');
      }

      attrs.operator = 'AND';
    }

    return attrs;
  };


  return POIFilter;
});

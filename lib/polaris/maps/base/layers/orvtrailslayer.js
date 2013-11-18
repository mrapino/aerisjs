define([
  'aeris/util',
  'base/layers/aerisinteractivetile'
], function (_, AerisInteractiveTile) {
  /**
   * Represents a ORV Trails tile layer.
   *
   * The public trails tile layer renders trail polylines
   * as tile images.
   *
   * @class aeris.polaris.maps.layers.ORVTrailsLayer
   * @extends aeris.maps.layers.AerisInteractiveTile
   *
   * @constructor
   * @override
   */
  var ORVTrailsLayer = function (opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      tileType: 'polaris_orvtrails',
      name: 'ORV Trails'
    });

    AerisInteractiveTile.call(this, attrs, opt_options);
  };
  _.inherits(ORVTrailsLayer, AerisInteractiveTile);


  return _.expose(ORVTrailsLayer, 'aeris.polaris.maps.layers.ORVTrailsLayer');
});

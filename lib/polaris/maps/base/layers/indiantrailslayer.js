define([
  'aeris/util',
  'base/layers/aerisinteractivetile'
], function (_, AerisInteractiveTile) {
  /**
   * Represents a Indian Motorcycle trails tile layer.
   *
   * The public trails tile layer renders trail polylines
   * as tile images.
   *
   * @class aeris.polaris.maps.layers.IndianTrailsLayer
   * @extends aeris.maps.layers.AerisInteractiveTile
   *
   * @constructor
   * @override
   */
  var IndianTrailsLayer = function (opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      tileType: 'polaris_indtrails',
      name: 'Indian Motorcycle Trails'
    });

    AerisInteractiveTile.call(this, attrs, opt_options);
  };
  _.inherits(IndianTrailsLayer, AerisInteractiveTile);


  return _.expose(IndianTrailsLayer, 'aeris.polaris.maps.layers.IndianTrailsLayer');
});

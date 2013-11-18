define([
  'aeris/util',
  'base/layers/aerisinteractivetile'
], function (_, AerisInteractiveTile) {
  /**
   * Represents a Victory Motorcycle trails tile layer.
   *
   * The public trails tile layer renders trail polylines
   * as tile images.
   *
   * @class aeris.polaris.maps.layers.VictoryTrailsLayer
   * @extends aeris.maps.layers.AerisInteractiveTile
   *
   * @constructor
   * @override
   */
  var VictoryTrailsLayer = function (opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      tileType: 'polaris_victrails',
      name: 'Victory motorcycle trails'
    });

    AerisInteractiveTile.call(this, attrs, opt_options);
  };
  _.inherits(VictoryTrailsLayer, AerisInteractiveTile);


  return _.expose(VictoryTrailsLayer, 'aeris.polaris.maps.layers.VictoryTrailsLayer');
});

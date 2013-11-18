define([
  'aeris/util',
  'base/layers/aerisinteractivetile'
], function (_, AerisInteractiveTile) {
  /**
   * Represents a Snowmobile Trails tile layer.
   *
   * The public trails tile layer renders trail polylines
   * as tile images.
   *
   * @class aeris.polaris.maps.layers.SnowTrailsLayer
   * @extends aeris.maps.layers.AerisInteractiveTile
   *
   * @constructor
   * @override
   */
  var SnowTrailsLayer = function (opt_attrs, opt_options) {
    var attrs = _.defaults(opt_attrs || {}, {
      tileType: 'polaris_snowtrails',
      name: 'Snowmobile Trails'
    });

    AerisInteractiveTile.call(this, attrs, opt_options);
  };
  _.inherits(SnowTrailsLayer, AerisInteractiveTile);


  return _.expose(SnowTrailsLayer, 'aeris.polaris.maps.layers.SnowTrailsLayer');
});

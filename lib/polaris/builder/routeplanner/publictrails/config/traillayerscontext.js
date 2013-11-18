define([
  'aeris/util'
], function(_) {
  /**
   * WireJS spec for the public trails Trail Layers sub-module
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.config.trailLayersContext
   * @static
   */
  return {
    // Manages trail layers
    trailLayersModule: {
      create: {
        module: 'polaris/routeplanner/publictrails/module/traillayersmodule',
        args: [{
          appState: { $ref: 'appState' },
          moduleState: { $ref: 'trailLayerStateCollection'},

          trailLayersController: { $ref: 'trailLayerViewController' }
        }]
      }
    },


    // Represents a collection of trail layers
    // (ToggleCollection)
    trailLayerStateCollection: {
      create: {
        module: 'mapbuilder/core/collection/mapobjectstatecollection',
        args: [undefined, {
          modelOptions: {
            namespace: 'aeris.polaris.maps.layers'
          }
        }]
      }
    },


    // Controls a collection of trail layer
    // MapObject views
    trailLayerViewController: {
      create: {
        module: 'mapbuilder/core/controller/mapobjectcollectioncontroller',
        args: [{
          collection: { $ref: 'trailLayerStateCollection' },
          itemViewOptions: {
            appState: { $ref: 'appState' }
          }
        }]
      }
    }
  };
});

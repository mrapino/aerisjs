define([
  'aeris/util',
  'polaris/routeplanner/publictrails/config/trailheadscontext',
  'polaris/routeplanner/publictrails/config/traillayerscontext'
], function(_, trailHeadsContext, trailLayersContext) {
  /**
   * WireJS spec for the public trails module.
   *
   * @class aeris.polaris.builder.routeplanner.publictrails.config.context
   * @static
   *
   * @mixes aeris.polaris.builder.routeplanner.publictrails.config.trailHeadsContext
   * @mixes aeris.polaris.builder.routeplanner.publictrails.config.trailLayersContext
   */
  return _.extend({
    // The publicTrails module
    // start up the trailHeads and trailLayers modules
    publicTrailsModule: {
      create: {
        module: 'polaris/routeplanner/publictrails/module/publictrailsmodule',
        args: [{
          modules: {
            trailHeads: { $ref: 'trailHeadsModule' },
            trailLayers: { $ref: 'trailLayersModule' }
          },

          comboState: { $ref: 'publicTrailsComboToggle' },
          trailHeadState: { $ref: 'trailHeadState' },
          trailLayersStateCollection: { $ref: 'trailLayerStateCollection' }
        }]
      }
    },

    // A combo toggle,
    // controlling all map object state objects
    // (trail layer and trail head marker states)
    publicTrailsComboToggle: {
      create: {
        module: 'application/form/model/combotoggle',
        args: [{
          name: 'Public Trails'
        }]
      }
    },


    // Nav menu controls to
    // select/deselect our trailHeadState
    // model.
    // (which in turn will tell our MapObject controllers
    //  to render/remove their objects)
    publicTrailsMenuController: {
      create: {
        module: 'application/form/controller/togglecontroller',
        args: [{
          className: 'aeris-navItem',
          template: { module: 'hbs!polaris/routeplanner/publictrails/view/menucontrol.html' },

          selectedClass: 'aeris-selected',
          deselectedClass: 'aeris-deselected',
          model: { $ref: 'publicTrailsComboToggle' },
          ui: {
            'selectBtn': 'a'
          },
          events: {
            'click a': 'toggleModel'
          }
        }]
      }
    }

  }, trailHeadsContext, trailLayersContext);
});

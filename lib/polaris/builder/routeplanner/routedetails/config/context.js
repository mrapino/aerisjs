define(function() {
  /**
   * WireJS Spec for the RouteDetails module.
   *
   * @class aeris.polaris.builder.routeplanner.routedetails.config.context
   * @static
   */
  return {
    routeDetailsState: {
      create: 'aeris/model'
    },

    routeDetailsModule: {
      create: {
        module: 'polaris/routeplanner/routedetails/module/routedetailsmodule',
        args: [{
          appState: { $ref: 'appState' },
          moduleState:  { $ref: 'routeDetailsState' },
          appStateAttr: 'routeDetails',

          trailController: { $ref: 'trailController' }
        }]
      }
    },

    // A MapObjectModel representing
    // the trailPolyline map object
    trailObjectModel: {
      create: {
        module: 'mapbuilder/core/model/mapobjectstate',
        args: [{
          value: 'TrailPolyline',
          class: 'TrailPolyline',
          selected: true
        }, {
          namespace: 'aeris.polaris.maps.polylines'
        }]
      }
    },


    // Controls the TrailPolyline MapObject
    trailController: {
      create: {
        module: 'polaris/routeplanner/routedetails/controller/trailcontroller',
        args: [{
          appState: { $ref: 'appState' },
          model: { $ref: 'trailObjectModel' }
        }]
      }
    }
  };
});

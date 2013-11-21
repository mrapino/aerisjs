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
          eventHub: { $ref: 'eventHub' },

          trail: { $ref: 'trailDataModel' },
          trailController: { $ref: 'trailController' },
          trailheadController: { $ref: 'trailheadController' }
        }]
      }
    },

    // A model of the data return from
    // for our trail from the Polaris PublicTrails API
    trailDataModel: {
      create: 'polaris/api/endpoint/model/trail'
    },

    // A MapObjectState model representing
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
          model: { $ref: 'trailObjectModel' },

          trail: { $ref: 'trailDataModel' }
        }]
      }
    },

    trailheadController: {
      create: {
        module: 'polaris/routeplanner/routedetails/controller/trailheadcontroller',
        args: [{
          trail: { $ref: 'trailDataModel' }
        }]
      },
      listenTo: {
        // Bind the controller's map
        // to the appState's map
        appState: {
          'map:set': 'eventTransformer.mapSet | setMap',
          'map:remove': 'eventTransformer.mapSet | setMap'
        }
      }
    },

    eventTransformer: { module: 'mapbuilder/transformer/eventdatatransformer' }
  };
});

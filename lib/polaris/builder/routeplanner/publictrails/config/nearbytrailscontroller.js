define({
  $exports: { $ref: 'nearbyTrailsListController' },
  
  nearbyTrailsListController: {
    create: {
      module: 'polaris/routeplanner/publictrails/controller/nearbytrailswrappercontroller',
      args: [
        {
          template: { module: 'hbars!polaris/routeplanner/publictrails/view/nearbytrailswrapper.html' },
          itemViewContainer: '.itemList',

          ui: {
            trailCount: '.trailCount',
            sectionToggle: 'h1'
          },

          tagName: 'section',
          className: 'nearbyTrails',

          closedClass: 'state-open',
          openClass: 'state-closed',

          itemView: { $ref: 'NearbyTrailItemController' },
          collection: { $ref: 'nearbyTrailCollection' }
        }
      ]
    }
  },

  NearbyTrailItemController: {
    ClassFactory: {
      module: 'polaris/routeplanner/publictrails/controller/nearbytrailcontroller',
      args: [
        {
          eventHub: { $ref: 'eventHub' },

          tagName: 'li',
          template: { module: 'hbars!polaris/routeplanner/publictrails/view/nearbytrail.html' },
          templateHelpers: { module: 'polaris/routeplanner/publictrails/templatehelpers/trailinfo' }
        }
      ]
    }
  },


  // A limited version of the public trails collection.
  nearbyTrailCollection: {
    create: {
      module: 'aeris/limitedcollection',
      args: [
        null,
        {
          limit: 15,
          sourceCollection: { $ref: 'trailData' }
        }
      ]
    }
  },

  $plugins: [
    { module: 'application/plugin/classfactory' }
  ]
});
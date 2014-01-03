define({
  $exports: { $ref: 'routePlannerApp' },

  routePlannerApp: {
    create: {
      module: 'polaris/routeplanner/routeplannerapp/module/routeplannerapp',
      args: [
        {
          layout: { $ref: 'mapAppLayout' },
          modules: { $ref: 'subModules' }
        }
      ]
    }
  },

  mapState: { wire: 'mapbuilder/mapapp/config/mapstate' },

  mapAppLayout: { wire: 'mapbuilder/mapapp/config/layout' },

  subModules: {
    wire: 'polaris/routeplanner/routeplannerapp/config/submodules'
  }
});

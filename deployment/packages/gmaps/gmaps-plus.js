({
  name: 'almond',
  out: '../../../build/packages/gmaps-plus.js',

  mainConfigFile: '../../../lib/config.js',
  baseUrl: '../../../lib',

  paths: {
    'ai/maps/strategy': 'aeris/maps/gmaps'
  },

  optimize: 'none',
  preserveLicenseComments: false,

  // Handlebars config
  inlineText: true,
  stubModules: ['text', 'hbars'],
  onBuildWrite : function(moduleName, path, content){
    // replace handlebars with the runtime version
    if (moduleName === 'Handlebars') {
      path = path.replace('handlebars.js','handlebars.runtime.js');
      content = fs.readFileSync(path).toString();
      content = content.replace(/(define\()(function)/, '$1"handlebars", $2');
    }
    return content;
  },

  include: [
    'ai/packages/maps',
    'ai/packages/gmaps',
    'ai/packages/api',
    'ai/packages/geoservice'
  ],
  wrap: {
    startFile: ['../../frag/almond/start.frag.js'],
    endFile: ['../../frag/almond/end.frag.js']
  }
})
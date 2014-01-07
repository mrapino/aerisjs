require.config({
  baseUrl: '/lib',
  //urlArgs: 'cb=' + Math.random(),                   // Cache buster
  paths: {
    tests: '../tests',
    async: '/tests/lib/async',
    jasmineBase: '/tests/lib/jasmine',
    jasmine: '/tests/lib/jasmine-modified',
    'jasmine-slow': '/tests/lib/jasmine-slow',
    'jasmine-html': '/tests/lib/jasmine-html',
    spec: '/tests/spec',
    mocks: '/tests/mocks',
    matchers: '/tests/lib/matchers',
    testErrors: '/tests/errors',
    testUtils: '/tests/testUtils',
    flag: '/tests/flag',
    sinon: '/tests/lib/sinon',
    strategy: 'aeris/maps/gmaps'
  },
  shim: {
    jasmineBase: {
      exports: 'jasmine'
    },
    'jasmine-html': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'jasmine-slow': {
      deps: ['jasmine'],
      exports: 'jasmine'
    },
    'sinon': {
      exports: 'sinon'
    }
  },
  config: {
    aeris: {
      apiId: 'ezHWL0MiLsxwlN2ik8U4c',
      apiSecret: 'uCDMeSj91lBfIKCmeQkpeZjsAwUUQJHuKesCvqTm',
      strategy: 'gmaps'
    }
  },
  waitSeconds: 3
});

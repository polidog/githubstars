'use strict'
require.config({
  shim: {
    'jquery': {
      exports:  '$'
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'namespace': {
      exports: ''
    }
  },
  paths: {
    "app": "javascripts/app",
    "jquery": "//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min",
    "bootstrap": "//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.2/js/bootstrap.min",
    "json2": "//cdnjs.cloudflare.com/ajax/libs/json2/20121008/json2.js",
    "underscore": "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.5.1/underscore-min",
    "backbone": "//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.0.0/backbone-min"
  },
  urlArgs: 'bust=' +  (new Date()).getTime()
});

require([
  'app',
  'jquery',
  'bootstrap',
], function (App) {
  App.init();
});
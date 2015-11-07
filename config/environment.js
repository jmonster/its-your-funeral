/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'its-your-funeral',
    environment: environment,
    contentSecurityPolicy: {
      'connect-src': "'self' https://auth.firebase.com wss://*.firebaseio.com https://api.dropboxapi.com  https://content.dropboxapi.com",
      'style-src': "'self' 'unsafe-inline'",
      'img-src': "'self' https://dl.dropboxusercontent.com"
    },
    baseURL: '/',
    locationType: 'auto',
    firebase: 'https://its-your-funeral.firebaseio.com/',
    torii: {
      'sessionServiceName': 'session',
      'providers': {
        'dropbox-oauth2': {
          'apiKey': process.env.DROPBOX_APP_KEY,
          'session': 'session'
        }
      }
    },
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};

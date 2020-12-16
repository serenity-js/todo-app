// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const
  { ArtifactArchiver } = require('@serenity-js/core'),
  { ConsoleReporter } = require('@serenity-js/console-reporter'),
  { Photographer, TakePhotosOfFailures, TakePhotosOfInteractions } = require('@serenity-js/protractor'),
  { SerenityBDDReporter } = require('@serenity-js/serenity-bdd'),
  isCI = require('is-ci');


/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './spec/**/*.e2e-spec.ts'
  ],
  chromeDriver: require(`chromedriver/lib/chromedriver`).path,
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',

  framework:      'custom',
  frameworkPath:  require.resolve('@serenity-js/protractor/adapter'),

  serenity: {
    runner: 'mocha',
    crew: [
      ArtifactArchiver.storingArtifactsAt(__dirname, '../../../target/site/serenity'),
      ConsoleReporter.forDarkTerminals(),
      Photographer.whoWill(TakePhotosOfFailures),
      // Photographer.whoWill(TakePhotosOfInteractions),
      new SerenityBDDReporter(),
    ]
  },

  mochaOpts: {
    timeout: 60 * 1000,
    // require: [
    //   'ts-node/register',
    // ]
  },

  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
  },

  capabilities: {
    browserName: 'chrome',

    // see https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities#loggingpreferences-json-object
    loggingPrefs: {
      browser: 'SEVERE' // "OFF", "SEVERE", "WARNING", "INFO", "CONFIG", "FINE", "FINER", "FINEST", "ALL".
    },

    chromeOptions: {
      args: [
        '--no-sandbox',
        '--disable-infobars',
        '--disable-dev-shm-usage',
        '--disable-extensions',
        '--log-level=3',
        '--disable-gpu',
        '--window-size=1920,1080',
        '--headless',
      ]
    }
  }
};

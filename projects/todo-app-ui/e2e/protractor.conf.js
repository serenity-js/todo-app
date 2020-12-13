// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
  chromeDriver: require(`chromedriver/lib/chromedriver`).path,
  directConnect: true,
  SELENIUM_PROMISE_MANAGER: false,
  baseUrl: 'http://localhost:4200/',
  framework: 'mocha',
  mochaOpts: {
    timeout: 60 * 1000,
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

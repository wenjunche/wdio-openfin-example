
exports.config = {
    port: 9515,
    path: '/',
    specs: [
        './test/*.js'
    ],

    capabilities: [{
        maxInstances: 1,
        browserName: 'openfin'
    }],

    logLevel: 'verbose',
    coloredLogs: true,

    waitforTimeout: 10000,
    connectionRetryTimeout: 900000,
    connectionRetryCount: 1,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd'
    },

    services: [
        ['openfin', {
            logFileName: 'wdio-chromedriver.log',
            outputDir: '.',
            args: ['--silent']
        }]
    ],
    openfin: {
        manifest: 'https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/selenium.json',
        debuggerPort: 9090
    }
}

WDIO OpenFIn Service Example
================================

----

This example demonstrates how to test OpenFin apps with [WDIO testrunner](http://webdriver.io/guide/testrunner/gettingstarted.html) and [WDIO OpenFin service](https://github.com/wenjunche/wdio-openfin-service.git).

## Run the example

```js

npm run test

```

## Configuration

The following example configuration shows how to start OpenFin Runtime with app manifest of Hello OpenFin demo app.

```js
// wdio.conf.js
export.config = {
  services: ['openfin'],
  openfin: {
     manifest: 'https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/selenium.json',
     debuggerPort: 9090 // required as a workaround for an issue in ChromeDriver
  }
};
```


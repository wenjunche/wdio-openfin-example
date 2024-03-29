const assert = require('assert');

async function switchWindow(windowHandle, callback) {
    await browser.switchToWindow(windowHandle);
    const title = await browser.getTitle();
    await callback(title);
}

async function switchWindowByTitle(windowTitle) {
    const handles = await browser.getWindowHandles();
    let handleIndex = 0;
    let checkTitle = async (title) => {
        console.log(title, windowTitle);
        if (title !== windowTitle) {
            handleIndex++;
            if (handleIndex < handles.length) {
                await switchWindow(handles[handleIndex], checkTitle);
            } else {
                // the window may not be loaded yet, so call itself again
                await switchWindowByTitle(windowTitle);
            }
        } else {
            console.log(`matched ${handleIndex}`, title, windowTitle);
        }
    };
    await switchWindow(handles[handleIndex], checkTitle);
}

/**
 *  Check if OpenFin Javascript API fin.desktop.System.getVersion exits
 *
 **/
 async function checkFinGetVersion(callback) {
    const result = await browser.executeAsync(function (done) {
        if (fin && fin.desktop && fin.desktop.System && fin.desktop.System.getVersion) {
            done(true);
        } else {
            done(false);
        }
    });
    callback(result);
 }

 async function waitForFinDesktop() {
    var callback = async (ready) => {
        if (ready === true) {
            readyCallback();
        } else {
            await browser.pause(1000);
            await waitForFinDesktop();
        }
    };
    await checkFinGetVersion(callback);
}


describe('Test Hello OpenFin', function() {
    it('Switch to Hello OpenFin Main window', async () => {
        await switchWindowByTitle("Hello OpenFin");
        const title = await browser.getTitle();
        assert.equal(title, 'Hello OpenFin');
    });

    it('Wait for OpenFin API ready', async () => {
        await waitForFinDesktop();
    });

    it("Click notification button", async () => {
        const notificationButton = await browser.$("#desktop-notification");
        await notificationButton.click();
        await browser.pause(3000);  // Pause here so you can see the notification
     });

    it("Click CPU Info button", async () => {
        const buton = await browser.$("#cpu-info");
        await buton.click();
        await browser.pause(3000);  // Pause here so you can see the CPU INFO child window
    });

    it('Switch to CPU Info window', async () => {
        await switchWindowByTitle("Hello OpenFin CPU Info");
    });

    it("Close CPU Info window", async () => {
        const button = await $("#close-app");
        await button.click();
    });

    it('Exit OpenFin Runtime', async () => {
        // execute OpenFin API to exit Runtime
        await browser.execute(function () {
            fin.desktop.System.exit();
        });
        await browser.pause(2000);  // pause here to give Runtime time to exit
    });
});

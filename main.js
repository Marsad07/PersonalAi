// Import the BrowserWindow class provided by Electron.
const { app, BrowserWindow } = require('electron');

app.whenReady().then(() => {
    // Create an instance of BrowserWindow (an actual desktop window).
    const window = new BrowserWindow({
        width: 800,
        height: 600
    });

    // Listen for the ready-to-show event.
    // When emitted, show the window once.
    window.once('ready-to-show', () => {
        console.log("Electron is ready and window will be shown soon!")
        window.show();
    });

    // Load the local HTMLnp  file into the BrowserWindow.
    window.loadFile("index.html");
})
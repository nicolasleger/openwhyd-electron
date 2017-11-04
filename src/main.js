const { app, BrowserWindow, Menu } = require('electron')
const { menu } = require('./menu')

require('electron-debug')({
  enabled: true, // => DevTools are also usable in production
  showDevTools: false // `true` to show DevTools on each created BrowserWindow
})

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    icon: __dirname + '/icon.ico',
    width: 1024,
    height: 900,
    webPreferences: {
      nodeIntegration: false, // to let jquery load in web mode
    },
  })

  Menu.setApplicationMenu(menu)
  //win.setMenu(menu) // for linux and windows only (necessary?)

  // and load the index.html of the app.
  win.loadURL('https://openwhyd.org/')

  // Open the DevTools.
  //win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

const electron = require('electron');
const {
    PASSWORDS_DATA, NEW_WEBSITE, NEW_MASTER_PASSWORD, NEW_MASTER_PASSWORD_SAVED,
    CHECK_MASTER_PASSWORD, CHECKED_MASTER_PASSWORD
} = require("./constants");
const PasswordManager = require("./models/PasswordManager");
const {ipcMain} = electron;
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

// TYPES

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    });

    mainWindow.loadURL('http://localhost:3000');
    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function () {
        mainWindow = null
    })

    mainWindow.webContents.on('did-finish-load', () => {
        emitPasswordsData();
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

ipcMain.on(NEW_WEBSITE, (event, data) => {
    let result = PasswordManager.addPasswordData(data, data.masterPassword);
    if (result.success) {
        emitPasswordsData();
    }
    mainWindow.webContents.send(result.event, result.eventValue);
})

ipcMain.on(NEW_MASTER_PASSWORD, (event, newPassword) => {
    PasswordManager.setMasterPassword(newPassword);
    mainWindow.webContents.send(NEW_MASTER_PASSWORD_SAVED);
})

ipcMain.on(CHECK_MASTER_PASSWORD, (event, data) => {
    mainWindow.webContents.send(CHECKED_MASTER_PASSWORD, PasswordManager.checkMasterPassword(data));
})

function emitPasswordsData() {
    let passwords = PasswordManager.getSavedPasswords();
    mainWindow.webContents.send(PASSWORDS_DATA, passwords);
}
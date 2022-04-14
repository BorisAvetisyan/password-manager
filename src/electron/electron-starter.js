const electron = require('electron');
const fs = require('fs');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const {processCSVString, hasMasterPassword, insertData} = require("./utils");
const {PASSWORDS_DATA, NEW_WEBSITE, EMPTY_MASTER_PASSWORD, NEW_MASTER_PASSWORD, NEW_MASTER_PASSWORD_SAVED,
    CHECK_MASTER_PASSWORD, CHECKED_MASTER_PASSWORD, NEW_PASSWORD_ADDED, MASTER_PASSWORD_FILE_PATH, PASSWORDS_FILE_PATH
} = require("./constants");
const PasswordManager = require("./models/PasswordManager");
const { ipcMain } = electron;
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
            enableRemoteModule:true,
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
        createWindow()
    }
});

ipcMain.on(NEW_WEBSITE, (event, data) => {
    const insertedData = [uuidv4(), data.url, data.name, data.password, moment().unix(), moment().unix()]
    if(hasMasterPassword()) {
        insertData(insertedData, () => {
            emitPasswordsData();
            const instanceObject = new PasswordManager(insertedData);
            mainWindow.webContents.send(NEW_PASSWORD_ADDED, instanceObject)
        })
    } else {
        mainWindow.webContents.send(EMPTY_MASTER_PASSWORD)
    }
})

ipcMain.on(NEW_MASTER_PASSWORD, (event, newPassword) => {
    // TODO encrypt master password
    fs.writeFileSync(MASTER_PASSWORD_FILE_PATH, newPassword);
    mainWindow.webContents.send(NEW_MASTER_PASSWORD_SAVED)
})

ipcMain.on(CHECK_MASTER_PASSWORD, (event, data) => {
    // todo encrypt master password to check
    const masterPassword = fs.readFileSync(MASTER_PASSWORD_FILE_PATH, "utf-8");
    mainWindow.webContents.send(CHECKED_MASTER_PASSWORD, data === masterPassword);
})

function emitPasswordsData() {
    if(!fs.existsSync(PASSWORDS_FILE_PATH)) {
        mainWindow.webContents.send(PASSWORDS_DATA, []);
        return;
    }
    fs.readFile(PASSWORDS_FILE_PATH, "utf-8", (err, csvString) => {
        if (err) {
            console.error(err);
        } else {
            const rows = processCSVString(csvString);
            mainWindow.webContents.send(PASSWORDS_DATA, rows)
        }
    });
}
const electron = require('electron');
const fs = require('fs');
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const {processCSVString, hasMasterPassword, insertData} = require("./utils");
const {PASSWORDS_DATA, NEW_WEBSITE, EMPTY_MASTER_PASSWORD, NEW_MASTER_PASSWORD, NEW_MASTER_PASSWORD_SAVED,
    CHECK_MASTER_PASSWORD, CHECKED_MASTER_PASSWORD
} = require("./constants");
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
    mainWindow.webContents.openDevTools();
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
            emitPasswordsData()
        })
    } else {
        mainWindow.webContents.send(EMPTY_MASTER_PASSWORD)
    }
})

ipcMain.on(NEW_MASTER_PASSWORD, (event, newPassword) => {
    const inputPath = 'src/database/master.txt';
    // if(!fs.existsSync(inputPath)) {
    //     fs.writeFileSync(inputPath, '')
    // }
    // TODO encrypt master password
    fs.writeFileSync(inputPath, newPassword);
    mainWindow.webContents.send(NEW_MASTER_PASSWORD_SAVED)
})

ipcMain.on(CHECK_MASTER_PASSWORD, (event, data) => {
    console.log("master password is, ", data);
    // todo encrypt master password to check
    const inputPath = 'src/database/master.txt';
    const masterPassword = fs.readFileSync(inputPath, "utf-8");
    mainWindow.webContents.send(CHECKED_MASTER_PASSWORD, data === masterPassword);
})

function emitPasswordsData() {
    const inputPath = 'src/database/passwords.csv';
    if(!fs.existsSync(inputPath)) {
        mainWindow.webContents.send(PASSWORDS_DATA, []);
        return;
    }
    fs.readFile(inputPath, "utf-8", (err, csvString) => {
        if (err) {
            console.error(err);
        } else {
            const rows = processCSVString(csvString);
            mainWindow.webContents.send(PASSWORDS_DATA, rows)
        }
    });
}
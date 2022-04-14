const fs = require("fs");
const PasswordManager = require("./models/PasswordManager");
const {PASSWORDS_FILE_PATH, MASTER_PASSWORD_FILE_PATH} = require("./constants");

function processCSVString(csvString) {
    const data = csvString.split('\n');
    const result = [];
    for (let i = 1; i < data.length; i++) {
        result.push(new PasswordManager(data[i].split(',')))
    }
    return result;
}

function hasMasterPassword() {
    try {
        const data = fs.readFileSync(MASTER_PASSWORD_FILE_PATH, "utf-8");
        return data.length;
    } catch (e) {
        return false;
    }
}

function insertData(newData, callback) {
    if(!fs.existsSync(PASSWORDS_FILE_PATH)) {
        fs.writeFileSync(PASSWORDS_FILE_PATH, PasswordManager.getFields());
    }
    fs.readFile(PASSWORDS_FILE_PATH, "utf-8", (err, csvString) => {
        if (err) {
            console.error(err);
        } else {
            const data = csvString.split('\n');
            data.push(newData.join(','));
            // TODO ENCRYPT WEBSITE PASSWORD
            fs.writeFileSync(PASSWORDS_FILE_PATH, data.join("\n"));
            callback();
        }
    });
}

module.exports = { processCSVString, hasMasterPassword, insertData }
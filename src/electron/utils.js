const fs = require("fs");
const PasswordManager = require("./models/PasswordManager");

function processCSVString(csvString) {
    const data = csvString.split('\n');
    const result = [];
    for (let i = 1; i < data.length; i++) {
        result.push(new PasswordManager(data[i].split(',')))
    }
    return result;
}

function hasMasterPassword() {
    const inputPath = 'src/database/master.txt';
    try {
        const data = fs.readFileSync(inputPath, "utf-8");
        return data.length;
    } catch (e) {
        return false;
    }
}

function insertData(newData, callback) {
    const inputPath = 'src/database/passwords.csv';
    if(!fs.existsSync(inputPath)) {
        fs.writeFileSync(inputPath, PasswordManager.getFields());
    }
    fs.readFile(inputPath, "utf-8", (err, csvString) => {
        if (err) {
            console.error(err);
        } else {
            const data = csvString.split('\n');
            data.push(newData.join(','));
            // TODO ENCRYPT WEBSITE PASSWORD
            fs.writeFileSync("src/database/passwords.csv", data.join("\n"));
            callback();
        }
    });
}

module.exports = { processCSVString, hasMasterPassword, insertData }
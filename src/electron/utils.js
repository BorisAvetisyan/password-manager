const fs = require("fs");

function processCSVString(csvString) {
    const data = csvString.split('\n');
    const result = []
    const props = data[0];
    const propNames = props.split(',');

    for (let i = 1; i < data.length; i++) {
        const item = {};
        const row = data[i].split(',');

        propNames.forEach((name, index) => {
            item[name] = row[index];
        })

        result.push(item);
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
        const fields = 'id,url,name,password,created_date,updated_date'
        fs.writeFileSync(inputPath, fields);
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
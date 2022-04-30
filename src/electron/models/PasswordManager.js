const {CHECKED_MASTER_PASSWORD, FAILED_TO_ADD_NEW_PASSWORD, MASTER_PASSWORD_FILE_PATH, PASSWORDS_FILE_PATH, NEW_PASSWORD_ADDED} = require("../constants");
const PasswordItem = require("./PasswordItem");
const {encrypt, decrypt} = require("../crypto/EncryptionUtils");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");
const fs = require("fs");

const fields = 'id,url,name,password,created_date,updated_date';

class PasswordManager {
    static setMasterPassword(password) {
        let ciphertext = encrypt(password, password);
        fs.writeFileSync(MASTER_PASSWORD_FILE_PATH, ciphertext);
    }

    static checkMasterPassword(password) {
        const masterPassword = fs.readFileSync(MASTER_PASSWORD_FILE_PATH, 'utf-8');
        const plaintext = decrypt(masterPassword, password);
        return plaintext === password;
    }

    static getSavedPasswords() {
        try {
            let data = fs.readFileSync(PASSWORDS_FILE_PATH, 'utf-8');
            return this.processCSVString(data);
        } catch (e) {
            return [];
        }
    }

    static addPasswordData(data, masterPassword) {
        if (this.hasMasterPassword()) {
            if (!this.checkMasterPassword(masterPassword)) {
                return {
                    success: false,
                    event: CHECKED_MASTER_PASSWORD,
                    eventValue: false
                };
            }
        } else {
            this.setMasterPassword(masterPassword);
        }

        const encryptedPassword = encrypt(data.password, masterPassword);
        const insertedData = [uuidv4(), data.url, data.name, encryptedPassword, moment().unix(), moment().unix()];
        try {
            this.insertData(insertedData);
            return {
                success: true,
                event: NEW_PASSWORD_ADDED
            };
        } catch (e) {
            return {
                success: false,
                event: FAILED_TO_ADD_NEW_PASSWORD
            };
        }
    }

    static hasMasterPassword() {
        try {
            const data = fs.readFileSync(MASTER_PASSWORD_FILE_PATH, "utf-8");
            return data.length;
        } catch (e) {
            return false;
        }
    }

    static processCSVString(csvString) {
        const data = csvString.split('\n');
        const result = [];
        for (let i = 1; i < data.length; i++) {
            result.push(new PasswordItem(data[i].split(',')))
        }
        return result;
    }

    static insertData(newData) {
        if(!fs.existsSync(PASSWORDS_FILE_PATH)) {
            fs.writeFileSync(PASSWORDS_FILE_PATH, fields);
        }

        const data = fs.readFileSync(PASSWORDS_FILE_PATH, "utf-8").split('\n');
        data.push(newData.join(','));
        fs.writeFileSync(PASSWORDS_FILE_PATH, data.join('\n'));
    }
}

module.exports = PasswordManager;
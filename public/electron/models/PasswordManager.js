const {
    EMPTY_MASTER_PASSWORD,
    CHECKED_MASTER_PASSWORD,
    FAILED_TO_ADD_NEW_PASSWORD,
    MASTER_PASSWORD_FILE_PATH,
    PASSWORDS_FILE_PATH,
    NEW_PASSWORD_ADDED,
    PASSWORD_DECRYPTED
} = require("../constants");
const PasswordItem = require("./PasswordItem");
const {encrypt, decrypt} = require("../crypto/EncryptionUtils");
const {v4: uuidv4} = require("uuid");
const moment = require("moment");
const fs = require("fs");

const fields = 'id,url,name,password,created_date,updated_date';

class PasswordManager {
    static setMasterPassword(password) {
        if (!password || !password.length) {
            throw new Error("Master password is missing");
        }
        const ciphertext = encrypt(password, password);
        fs.writeFileSync(MASTER_PASSWORD_FILE_PATH, ciphertext, {flag: 'wx'});
    }

    static checkMasterPassword(password) {
        if (!password || !password.length) {
            return false;
        }
        const masterPassword = fs.readFileSync(MASTER_PASSWORD_FILE_PATH, 'utf-8');
        const plaintext = decrypt(masterPassword, password);
        return plaintext === password;
    }

    static getSavedPasswords() {
        try {
            const data = fs.readFileSync(PASSWORDS_FILE_PATH, 'utf-8');
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

    static updatePassword(id, newPassword, masterPassword) {
        if (!newPassword || !newPassword.length) {
            throw new Error('Invalid new password specified');
        }
        if (!this.hasMasterPassword()) {
            return {
                success: false,
                event: EMPTY_MASTER_PASSWORD
            };
        }
        if (!this.checkMasterPassword(masterPassword)) {
            return {
                success: false,
                event: CHECKED_MASTER_PASSWORD,
                eventValue: false
            };
        }

        let encryptedPassword = encrypt(newPassword, masterPassword);
        let data = fs.readFileSync(PASSWORDS_FILE_PATH, "utf-8").split('\n');
        const requiredIndex = data.findIndex(item => {
            const fields = item.split(',');
            return fields[0] === id;
        });

        if (requiredIndex === -1) {
            // @todo maybe show an error
        } else {
            const passwordItem = data[requiredIndex].split(',');
            passwordItem[3] = encryptedPassword;
            data[requiredIndex] = passwordItem.join(',');
            fs.writeFileSync(PASSWORDS_FILE_PATH, data.join('\n'));
        }
    }

    static deletePassword(id, masterPassword) {
        if (!this.hasMasterPassword()) {
            return {
                success: false,
                event: EMPTY_MASTER_PASSWORD
            };
        }
        if (!this.checkMasterPassword(masterPassword)) {
            return {
                success: false,
                event: CHECKED_MASTER_PASSWORD,
                eventValue: false
            };
        }

        const data = fs.readFileSync(PASSWORDS_FILE_PATH, "utf-8").split('\n');
        const requiredIndex = data.findIndex(item => {
            const fields = item.split(',');
            return fields[0] === id;
        });

        if (requiredIndex === -1) {
            // @todo maybe show an error
        } else {
            const updatedData = data.splice(requiredIndex, 1);
            fs.writeFileSync(PASSWORDS_FILE_PATH, updatedData.join('\n'));
        }
    }

    static decryptPassword(item, masterPassword) {
        if (!this.checkMasterPassword(masterPassword)) {
            return {
                success: false,
                event: CHECKED_MASTER_PASSWORD,
                eventValue: false
            };
        }
        let plaintext = decrypt(item.password, masterPassword);
        return {
            success: true,
            event: PASSWORD_DECRYPTED,
            eventValue: plaintext
        };
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
        if (!fs.existsSync(PASSWORDS_FILE_PATH)) {
            fs.writeFileSync(PASSWORDS_FILE_PATH, fields);
        }

        const data = fs.readFileSync(PASSWORDS_FILE_PATH, "utf-8").split('\n');
        data.push(newData.join(','));
        fs.writeFileSync(PASSWORDS_FILE_PATH, data.join('\n'));
    }
}

module.exports = PasswordManager;
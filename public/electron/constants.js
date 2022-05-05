const PASSWORDS_DATA = 'PASSWORDS_DATA'
const NEW_WEBSITE = 'NEW_WEBSITE';

// EMITTERS
const EMPTY_MASTER_PASSWORD = 'EMPTY_MASTER_PASSWORD';
const NEW_MASTER_PASSWORD = 'NEW_MASTER_PASSWORD';
const NEW_MASTER_PASSWORD_SAVED = 'NEW_MASTER_PASSWORD_SAVED';
const CHECK_MASTER_PASSWORD = 'CHECK_MASTER_PASSWORD';
const CHECKED_MASTER_PASSWORD = 'CHECKED_MASTER_PASSWORD';
const NEW_PASSWORD_ADDED = 'NEW_PASSWORD_ADDED';
const FAILED_TO_ADD_NEW_PASSWORD = 'FAILED_TO_ADD_NEW_PASSWORD';
const PASSWORD_DECRYPT = 'PASSWORD_DECRYPT'
const PASSWORD_DECRYPTED = 'PASSWORD_DECRYPTED';
const GENERATE_RANDOM_PASSWORD = 'GENERATE_RANDOM_PASSWORD';
const GENERATED_RANDOM_PASSWORD = 'GENERATED_RANDOM_PASSWORD';
const GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS = 'GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS';
const GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS = 'GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS';

const getAppDataPath = () => {
    switch (process.platform) {
        case "darwin": {
            return path.join(process.env.HOME, "Library", "Application Support", "yourpasswordmanager");
        }
        case "win32": {
            return path.join(process.env.APPDATA, "yourpasswordmanager");
        }
        case "linux": {
            return path.join(process.env.HOME, ".yourpasswordmanager");
        }
        default: {
            console.log("Unsupported platform!");
            process.exit(1);
        }
    }
}

const path = require('path');

const PASSWORDS_FILE_PATH = path.join(getAppDataPath(), 'passwords.csv');
const MASTER_PASSWORD_FILE_PATH = path.join(getAppDataPath(), 'master.txt');

module.exports = {
    PASSWORDS_DATA,
    NEW_WEBSITE,
    EMPTY_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD_SAVED,
    CHECK_MASTER_PASSWORD,
    CHECKED_MASTER_PASSWORD,
    NEW_PASSWORD_ADDED,
    PASSWORDS_FILE_PATH,
    MASTER_PASSWORD_FILE_PATH,
    FAILED_TO_ADD_NEW_PASSWORD,
    PASSWORD_DECRYPTED,
    PASSWORD_DECRYPT,
    GENERATED_RANDOM_PASSWORD,
    GENERATE_RANDOM_PASSWORD,
    GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS,
    GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS
}
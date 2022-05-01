const crypto = require('crypto-js');

const encrypt = (plaintext, key) => {
    return crypto.AES.encrypt(plaintext, key).toString();
};

const decrypt = (ciphertext, key) => {
    const bytes = crypto.AES.decrypt(ciphertext, key);
    return  bytes.toString(crypto.enc.Utf8);
};

module.exports = { encrypt, decrypt };
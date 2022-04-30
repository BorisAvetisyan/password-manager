const symbols = ["@", "#", "$", "%", "*", "!", "?"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const crypto = require('crypto');

const generateRandomPassword = (length, includeSymbols, includeDigits, includeLowercase, includeUppercase) => {
    const distributions = getCountDistributions(length, includeSymbols, includeDigits, includeLowercase, includeUppercase);
    let keyOfIncludedItems = Object.keys(distributions).filter(item => distributions[item].include);
    let password = "";
    while (password.length < length) {
        let data = distributions[getRandomElementFromArray(keyOfIncludedItems)];
        password += getRandomElementFromArray(data.values);
        data.amount--;
        if (data.amount == 0) {
            keyOfIncludedItems = Object.keys(distributions).filter(item => (distributions[item].include && distributions[item].amount > 0));
        }
    }
    return password;
};

const generatePassword = (words, maxLength) => {

}

const getCountDistributions = (length, includeSymbols, includeDigits, includeLowercase, includeUppercase) => {
    let result = {
        symbols: {
            values: symbols,
            include: includeSymbols,
            amount: includeSymbols ? 1 : 0
        },
        digits: {
            values: digits,
            include: includeDigits,
            amount: includeDigits ? 1 : 0
        },
        lowercaseLetters: {
            values: lowercaseLetters,
            include: includeLowercase,
            amount: includeLowercase ? 1 : 0
        },
        uppercaseLetters: {
            values: uppercaseLetters,
            include: includeUppercase,
            amount: includeUppercase ? 1 : 0
        }
    };

    let keyOfIncludedItems = Object.keys(result).filter(item => result[item].include);

    while (keyOfIncludedItems.reduce((a, b) => a + result[b].amount, 0) < length) {
        let key = getRandomElementFromArray(keyOfIncludedItems);
        result[key].amount++;
    }

    return  result;
}

const getRandomElementFromArray = (array) => {
    console.log("crypto is, ", crypto);
    return array[crypto.randomInt(0, array.length)];
}

module.exports = { generateRandomPassword, generatePassword };
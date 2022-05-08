const { symbols, digits, lowercaseLetters, uppercaseLetters, replacements, concatenationSymbols } = require('./PasswordGeneratorConstants');

const crypto = require('crypto');
const PasswordAnalyser = require('./PasswordAnalyser');

const generateRandomPassword = (length, includeSymbols, includeDigits, includeLowercase, includeUppercase) => {
    const distributions = getCountDistributions(length, includeSymbols, includeDigits, includeLowercase, includeUppercase);
    let keyOfIncludedItems = Object.keys(distributions).filter(item => distributions[item].include);
    let password = "";
    while (password.length < length) {
        let data = distributions[getRandomElementFromArray(keyOfIncludedItems)];
        password += getRandomElementFromArray(data.values);
        data.amount--;
        if (data.amount === 0) {
            keyOfIncludedItems = Object.keys(distributions).filter(item => (distributions[item].include && distributions[item].amount > 0));
        }
    }
    return password;
};

const generatePassword = (words) => {
    let passwords = [];
    for (let i = 0; i < 10; i++) {
        let password = generatePasswordBasedOnWords(words);
        let scoreResult = PasswordAnalyser.analyse(password);
        passwords.push({
            password: password,
            score: scoreResult
        });
    }
    let currentBestPassword = passwords[0];
    for (let i = 1; i < 10; i++) {
        if (passwords[i].score.guesses_log10 > currentBestPassword.score.guesses_log10) {
            currentBestPassword = passwords[i];
        }
    }

    return currentBestPassword.password;
}

const generatePasswordBasedOnWords = (words) => {
    if (words.length < 2) {
        throw new Error('You must provide at least 2 words.');
    }
    let password = '';
    for (let i = 0; i < words.length; i++) {
        let word = words[i].toLowerCase();
        let modifiedWord = '';
        for (let j = 0; j < word.length; j++) {
            const shouldModify = getRandomBoolean(60);
            let character = word.charAt(j);
            if (shouldModify && replacements[character.toLowerCase()]) {
                character = getRandomElementFromArray(replacements[character.toLowerCase()]);
            } else {
                character = word.charAt(j);
            }
            if (getRandomBoolean(30)) {
                character = character.toUpperCase();
            }
            modifiedWord += character;
        }
        password += modifiedWord;
        if (i != words.length - 1) {
            password += getRandomElementFromArray(concatenationSymbols);
        }
    }

    return password;
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

const getRandomBoolean = (weight = 50) => {
    const randomNumber = crypto.randomInt(0, 101);
    return randomNumber <= weight;
}

module.exports = { generateRandomPassword, generatePassword };
const {BiasWords} = require("./SPConstants");
const keyLength = 16;

const generateSubKeys = (originalKey) => {
    if (originalKey.length !== keyLength) {
        throw new Error(`The original key must have ${keyLength} length`);
    }

    let result = createEmptyMatrix(keyLength + 1, keyLength);
    result[0] = Array(keyLength);
    for (let i = 0; i < keyLength; i++) {
        result[0][i] = originalKey.codePointAt(i);
    }

    let intermediateResult = createEmptyMatrix(keyLength + 1, keyLength + 1);
    let sum = 0;
    for (let i = 0; i < keyLength; i++) {
        sum = mod(sum ^ originalKey.codePointAt(i));
        intermediateResult[0][i] = originalKey.codePointAt(i);
    }
    intermediateResult[0][keyLength] = sum;

    for (let i = 1; i <= keyLength; i++) {
        for (let j = 0; j < intermediateResult[i].length; j++) {
            let val = intermediateResult[i - 1][j];
            val = rotateLeft(val, 3);
            intermediateResult[i][j] = val;
        }
    }

    for (let i = 1; i <= keyLength; i++) {
        for (let j = 0; j < keyLength; j++) {
            let index = (i + j) % intermediateResult[i].length;
            let biasWord = BiasWords[i - 1][j];
            let value = intermediateResult[i][index];
            result[i][j] = mod(value + biasWord);
        }
    }

    return result;
};

const mod = (val) => {
    return val % 256;
};

const rotateLeft = (value, shift) => {
    return mod(((value & 0xff) << shift) | ((value & 0xff) >>> (8 - shift)));
};

const createEmptyMatrix = (rows, columns) => {
  let result = Array(rows);
    for (let i = 0; i < rows; i++) {
        result[i] = Array(columns);
    }
    return result;
};

module.exports = {generateSubKeys};
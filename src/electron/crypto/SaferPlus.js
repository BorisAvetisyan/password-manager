const {M, M_Inverse, additionRoundIndices, modAdditionRoundIndices} = require('./SPConstants');
const {generateSubKeys} = require('./SPKeySchedule');

const blockSize = 16;

const encrypt = (plaintext, key) => {
    let numberOfBlocks = Math.ceil(plaintext.length / blockSize);
    if (plaintext.length % blockSize === 0) {
        numberOfBlocks++;
    }

    let blocks = createEmptyMatrix(numberOfBlocks, blockSize);
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blockSize; j++) {
            blocks[i][j] = plaintext.charCodeAt(i * blockSize + j);
        }
    }

    let emptyCellCount = numberOfBlocks * blockSize - plaintext.length;
    for (let i = blockSize - emptyCellCount; i < blockSize; i++) {
        blocks[numberOfBlocks - 1][i] = emptyCellCount;
    }

    for (let i = 0; i < numberOfBlocks; i++) {
        blocks[i] = encryptBlock(blocks[i], key);
    }

    return blocks.map(item => item.join('|')).join('|');
};

const decrypt = (ciphertext, key) => {
    let bytes = ciphertext.split('|');
    let blocks = createEmptyMatrix(bytes.length / blockSize, blockSize);
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blockSize; j++) {
            blocks[i][j] = parseInt(bytes[i * blockSize + j]);
        }
    }

    for (let i = 0; i < blocks.length; i++) {
        blocks[i] = decryptBlock(blocks[i], key);
    }

    const addedCharactersCount = blocks[blocks.length - 1][blockSize - 1];
    const plaintextLength = blockSize * blocks.length - addedCharactersCount;

    let plaintext = '';
    for (let i = 0; i < blocks.length; i++) {
        for (let j = 0; j < blocks[i].length; j++) {
            if (plaintext.length === plaintextLength) {
                return plaintext;
            }
            plaintext += String.fromCharCode(blocks[i][j]);
        }
    }

    return plaintext;
};

const encryptBlock = (plaintext, key) => {
    const subKeys = generateSubKeys(key);
    let result = Array(plaintext.length);
    for (let i = 0; i < plaintext.length; i++) {
        result[i] = plaintext[i];
    }

    for (let i = 0; i < 8; i++) {
        const subKey1 = subKeys[2 * i];
        const subKey2 = subKeys[2 * i + 1];

        additionRoundIndices.forEach(index => {
            result[index] = mod(result[index] ^ subKey1[index]);
            result[index] = mod(modPow(result[index]));
            result[index] = mod(result[index] + subKey2[index]);
        });

        modAdditionRoundIndices.forEach(index => {
            result[index] = mod(result[index] + subKey1[index]);
            result[index] = log(result[index]);
            result[index] = mod(result[index] ^ subKey2[index]);
        });

        let newResult = Array(result.length);
        for (let j = 0; j < result.length; j++) {
            newResult[j] = multiplyWithM(result, j);
        }
        result = newResult;
    }

    additionRoundIndices.forEach(index => { // 0, 3, 4, 7, 8, 11, 12, 15
        result[index] = mod(result[index] ^ subKeys[subKeys.length - 1][index]);
    });
    modAdditionRoundIndices.forEach(index => { // 1, 2, 5, 6, 9, 10, 13, 14
        result[index] = mod(result[index] + subKeys[subKeys.length - 1][index]);
    });

    return result;
};

const decryptBlock = (ciphertext, key) => {
    const subKeys = generateSubKeys(key);
    let result = Array(ciphertext.length);
    for (let i = 0; i < ciphertext.length; i++) {
        result[i] = ciphertext[i];
    }

    additionRoundIndices.forEach(index => { // 1, 2, 5, 6, 9, 10, 13, 14
        result[index] = mod(result[index] ^ subKeys[16][index]);
    });
    modAdditionRoundIndices.forEach(index => { // 1, 2, 5, 6, 9, 10, 13, 14
        result[index] = mod(result[index] - subKeys[16][index]);
    });

    for (let i = 7; i >= 0; i--) {
        const subKey1 = subKeys[2 * i + 1];
        const subKey2 = subKeys[2 * i];

        let newResult = Array(result.length);
        for (let j = 0; j < result.length; j++) {
            newResult[j] = multiplyWithMInverse(result, j);
        }
        result = newResult;

        additionRoundIndices.forEach(index => { // 1, 2, 5, 6, 9, 10, 13, 14
            result[index] = mod(result[index] - subKey1[index]);
            result[index] = log(result[index]);
            result[index] = mod(result[index] ^ subKey2[index]);
        });
        modAdditionRoundIndices.forEach(index => { // 1, 2, 5, 6, 9, 10, 13, 14
            result[index] = mod(result[index] ^ subKey1[index]);
            result[index] = modPow(result[index]);
            result[index] = mod(result[index] - subKey2[index]);
        });
    }

    return result;
};

const multiplyWithM = (output, index) => {
    let result = 0;
    for (let i = 0; i < M.length; i++) {
        result = mod(result + (M[i][index] * output[i]));
    }
    return mod(result);
}

const multiplyWithMInverse = (output, index) => {
    let result = 0;
    for (let i = 0; i < M_Inverse.length; i++) {
        result = mod(result + M_Inverse[i][index] * output[i]);
    }
    return mod(result);
}

const modPow = (power) => {
    if (power === 128) {
        return 0;
    }

    let result = 45;
    for (let i = 2; i <= power; i++) {
        result = result * 45;
        result = result % 257;
    }
    return result;
}

const log = (value) => {
    if (value === 0) {
        return 128;
    }

    for (let i = 0; i <= 256; i++) {
        if (modPow(i) === value) {
            return i;
        }
    }
    throw new Error('This must not happen');
}

const mod = (val) => {
    if (val < 0) {
        val += 256;
    }
    return val % 256;
};

const createEmptyMatrix = (rows, columns) => {
    let result = Array(rows);
    for (let i = 0; i < rows; i++) {
        result[i] = Array(columns);
    }
    return result;
};

module.exports = {encrypt, decrypt};
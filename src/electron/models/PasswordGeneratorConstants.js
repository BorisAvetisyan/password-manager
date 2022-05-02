const symbols = ["@", "#", "$", "%", "*", "!", "?"];
const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const lowercaseLetters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const uppercaseLetters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const replacements = {
    "a": ["@", "a", "&"],
    "b": ["b"],
    "c": ["(", "c", "["],
    "d": ["d"],
    "e": ["3", "e"],
    "f": ["f", "7"],
    "g": ["g", "9"],
    "h": ["h"],
    "i": ["1", "!", "i"],
    "j": ["j"],
    "k": ["4", "k"],
    "l": [")", "1", "l", "]"],
    "m": ["m", "nn"],
    "n": ["n"],
    "o": ["0", "o", "*"],
    "p": ["p", "[o", "%"],
    "q": ["q", "o]", "?"],
    "r": ["r"],
    "s": ["s", "$", "5", "/"],
    "t": ["t", "-|-"],
    "u": ["u"],
    "v": ["v", "^"],
    "w": ["w", "vv"],
    "x": ["x", "><"],
    "y": ["y"],
    "z": ["z", "-/_"],
    "0": ["0", "o"],
    "1": ["1", "!"],
    "2": ["2"],
    "3": ["3", "E"],
    "4": ["4"],
    "5": ["5", "S", "$"],
    "6": ["6"],
    "7": ["7"],
    "8": ["8", "%"],
    "9": ["9"]
};

const concatenationSymbols = ["&", "+", "_", "#", ".", "-"];

module.exports = { symbols, digits, lowercaseLetters, uppercaseLetters, replacements, concatenationSymbols };
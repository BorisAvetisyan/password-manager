const zxcvbn = require('zxcvbn');

class PasswordAnalyser {
    static analyse(password) {
        let scoreResult = zxcvbn(password);
        return {
            password: password,
            score: scoreResult.score,
            guesses: scoreResult.guesses,
            guesses_log10: scoreResult.guesses_log10,
            online_no_throttling_10_per_second: scoreResult.crack_times_display.online_no_throttling_10_per_second
        };
    }
}

module.exports = PasswordAnalyser;
import zxcvbn from 'zxcvbn';

function PasswordChecker() {

    const checkPassword = (e) => {
        console.log(zxcvbn(e.target.value));
    }

    return(
        <>
            <p>Type your password to check how strength it is</p>
            <input type="text" onChange={checkPassword} />
        </>
    )
}

export default PasswordChecker;
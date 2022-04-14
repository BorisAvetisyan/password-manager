import React, { useState } from "react";
import zxcvbn from "zxcvbn";

function PasswordInput({ handleChange }) {

    const [score, setScore] = useState(0);
    const [value, setValue] = useState('');

    const onChange = (e) => {
        handleChange(e);
        const value = e.target.value
        const passwordInfo = zxcvbn(value, [])
        setScore(passwordInfo.score);
        setValue(e.target.value);
    }

    return(
        <div className="form-group mt-1">
            <label htmlFor="password">Password</label>
            <input
                value={value}
                onChange={(e) => onChange(e) }
                type="password" className="form-control" id="password"
                aria-describedby="password" placeholder="Enter Website Password" />

            <div className={"strength-meter mt-2 " + (  value.length > 0 ? 'visible' : 'invisible' )}>
                <div className="strength-meter-fill" data-strength={score}></div>
            </div>
        </div>
    )
}

export default PasswordInput;
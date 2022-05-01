import React, {useEffect, useMemo, useRef, useState, memo} from "react";
import zxcvbn from "zxcvbn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function PasswordInput({ handleChange = () => {}, placeHolder, defaultValue = '' }) {

    const [score, setScore] = useState(0);
    const [value, setValue] = useState(defaultValue);
    const [showPassword, setShowPassword] = useState(false);
    const passwordInput = useRef();

    useEffect(() => {
        const passwordInfo = zxcvbn(value, [])
        setScore(passwordInfo.score);
    }, [defaultValue])

    const onChange = (e) => {
        handleChange(e);
        const value = e.target.value
        const passwordInfo = zxcvbn(value, [])
        setScore(passwordInfo.score);
        setValue(e.target.value);
    }

    const onShowClick = () => {
        const currentType = passwordInput.current.type;
        passwordInput.current.type = currentType === 'text' ? 'password' : 'text';
        setShowPassword(!showPassword);
    }

    const memoizedScoreText = useMemo(() => {
        if(!value.length) {
            return "";
        }
        const scoreTextMap = {
            0: "Very Weak",
            1: "Weak",
            2: "Fair",
            3: "Good",
            4: "Strong"
        }
        return scoreTextMap[score];
    }, [score, value])

    return(
        <div className="form-group mt-1">
            <label htmlFor="password">Password</label>
            <div className="input-group">
                <input
                    ref={passwordInput}
                    value={value}
                    onChange={(e) => onChange(e) }
                    type="password" className="form-control" id="password"
                    aria-describedby="password" placeholder={placeHolder || "Enter Website Password"} />
                <div className="input-group-append">
                <span className="input-group-text cursor-pointer" id="password" onClick={onShowClick}>
                    {
                        showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />
                    }
                </span>
                </div>
            </div>
            <div className={"strength-meter mt-2 " + (  value.length > 0 ? 'visible' : 'invisible' )}>
                <div className="strength-meter-fill" data-strength={score}></div>
            </div>
            <div className="score-text" >
                <span data-score={score} >{ memoizedScoreText }</span>
            </div>
        </div>
    )
}

export default memo(PasswordInput);
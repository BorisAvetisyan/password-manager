import NumericInput from "./common/NumericInput";
import {useEffect, useState} from "react";
import {GENERATE_RANDOM_PASSWORD, GENERATED_RANDOM_PASSWORD, ROUTES} from "../utils/constants";
import {useHistory} from "react-router";

const electron = window.require('electron');

function RandomPasswordGenerator() {
    const [generatedPassword, setGeneratedPassword] = useState('');
    const history = useHistory();
    const [error, setError] = useState('');

    useEffect(() => {
        electron.ipcRenderer.on(GENERATED_RANDOM_PASSWORD, (event, payload) => {
            setGeneratedPassword(payload);
        })
    }, [])

    const [form, setForm] = useState({
        length: 0,
        includeSymbols: false,
        includeDigits: false,
        includeLowercase: false,
        includeUppercase: false
    })

    const onCheckboxChange = (key) => {
        error.length && setError('');
        setForm({...form, [key]: !form[key] })
    }
    
    const onGenerateClick = () => {
        if(!form.includeDigits && !form.includeSymbols && !form.includeLowercase && !form.includeUppercase) {
            setError("One of the options should be selected");
            return;
        }

        electron.ipcRenderer.send(GENERATE_RANDOM_PASSWORD, form);
    }

    const reset = () => {
        setForm({
            length: 0,
            includeSymbols: false,
            includeDigits: false,
            includeLowercase: false,
            includeUppercase: false
        })
        setGeneratedPassword('');
    }

    const copy = () => {
        navigator.clipboard.writeText(generatedPassword)
    }
    
    const addToPasswordManager = () => {
        history.push({
            pathname: ROUTES.NEW_WEBSITE,
            state: { generatedPassword }
        })
    }

    return(<div className="random-password-generator-container">
            {error && <p className="invalid-text mt-3">{error}</p>}

            <div className="length-block-container mt-5">
                <div className="length-block d-flex align-items-center justify-content-around">
                    Length :
                    <NumericInput defaultValue={form.length} handleChange={(value) =>  setForm({...form, length: value}) }  />
                </div>

            </div>

            <div className="">
                <div className="form-check">
                    <input checked={form.includeSymbols} className="form-check-input" type="checkbox" value="" id="symbols-checkbox" onChange={() => onCheckboxChange('includeSymbols') } />
                    <label className="form-check-label" htmlFor="symbols-checkbox">
                        Symbols
                    </label>
                </div>
                <div className="form-check">
                    <input checked={form.includeDigits}  className="form-check-input" type="checkbox" value="" id="numbers-checkbox" onChange={() => onCheckboxChange('includeDigits') } />
                    <label className="form-check-label" htmlFor="numbers-checkbox">
                        Numbers
                    </label>
                </div>
                <div className="form-check">
                    <input checked={form.includeUppercase} className="form-check-input" type="checkbox" value="" id="uppercase-checkbox" onChange={() => onCheckboxChange('includeUppercase') } />
                    <label className="form-check-label" htmlFor="uppercase-checkbox">
                        Uppercase
                    </label>
                </div>
                <div className="form-check">
                    <input checked={form.includeLowercase} className="form-check-input" type="checkbox" value="" id="lowercase-checkbox" onChange={() => onCheckboxChange('includeLowercase') } />
                    <label className="form-check-label" htmlFor="lowercase-checkbox">
                        Lowercase
                    </label>
                </div>
            </div>

            <div className="generate-block mt-5">
                <button disabled={form.length === 0} className="btn btn-default btn-black w-100" onClick={onGenerateClick}>Generate</button>
            </div>

            <div className="text-center mt-3">
                <span className="generated-value">{generatedPassword}</span>
            </div>

            <div className="actions-block d-flex justify-content-center mt-3">
                <button className="btn btn-black" onClick={reset}>
                    <span className="action-text f-11">Reset</span>
                </button>
                <button className="btn btn-black" onClick={copy}>
                    <span className="action-text f-11">
                        Copy
                    </span>
                </button>
                <button className="btn btn-black" onClick={addToPasswordManager} disabled={!generatedPassword.length}>
                    <span className="action-text f-11">
                        Add to Password Manager
                    </span>
                </button>
            </div>
        </div>
    )
}
export default RandomPasswordGenerator;
import NumericInput from "./common/NumericInput";
import {useEffect, useState} from "react";
import {GENERATE_RANDOM_PASSWORD, GENERATED_RANDOM_PASSWORD} from "../utils/constants";

const electron = window.require('electron');

function RandomPasswordGenerator() {
    const [generatedPassword, setGeneratedPassword] = useState('');

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
        setForm({...form, [key]: !form[key] })
    }
    
    const onGenerateClick = () => {
        electron.ipcRenderer.send(GENERATE_RANDOM_PASSWORD, form);
    }

    return(<div className="random-password-generator-container">
            <div className="length-block-container mt-5">
                <div className="length-block d-flex align-items-center justify-content-around">
                    Length :
                    <NumericInput handleChange={(value) =>  setForm({...form, length: value}) }  />
                </div>

            </div>

            <div className="">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="symbols-checkbox" onChange={() => onCheckboxChange('includeSymbols') } />
                    <label className="form-check-label" htmlFor="symbols-checkbox">
                        Symbols
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="numbers-checkbox" onChange={() => onCheckboxChange('includeDigits') } />
                    <label className="form-check-label" htmlFor="numbers-checkbox">
                        Numbers
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="uppercase-checkbox" onChange={() => onCheckboxChange('includeUppercase') } />
                    <label className="form-check-label" htmlFor="uppercase-checkbox">
                        Uppercase
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="lowercase-checkbox" onChange={() => onCheckboxChange('includeLowercase') } />
                    <label className="form-check-label" htmlFor="lowercase-checkbox">
                        Lowercase
                    </label>
                </div>
            </div>

            <div className="generate-block mt-5">
                <button className="btn btn-default btn-black w-100" onClick={onGenerateClick}>Generate</button>
            </div>

            <div className="text-center mt-3">
                <span className="generated-value">{generatedPassword}</span>
            </div>

            <div className="actions-block d-flex justify-content-center mt-3">
                <button className="btn btn-black">
                    <span className="action-text f-11">Reset</span>
                </button>
                <button className="btn btn-black">
            <span className="action-text f-11">
                Copy
            </span>
                </button>
                <button className="btn btn-black">
            <span className="action-text f-11">
                Add to Password Manager
            </span>
                </button>
            </div>
        </div>
    )
}
export default RandomPasswordGenerator;
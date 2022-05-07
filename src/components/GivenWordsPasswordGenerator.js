import NumericInput from "./common/NumericInput";
import React, {useState} from "react";
import {
    GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS,
    GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS,
    ROUTES
} from "../utils/constants";
import {useHistory} from "react-router";

const electron = window.require('electron');

function GivenWordsPasswordGenerator() {
    const [error, setError] = useState('')
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [form, setForm] = useState({
        generatedWords: [],
        length: 8,
        wordsInput: ''
    })
    const history = useHistory();

    electron.ipcRenderer.on(GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS, (event, payload) => {
        setGeneratedPassword(payload);
    })

    const generate = () => {
        setError('');
        
        const words = filteredGeneratedWords();
        if(!words.length || words.length < 2) {
            setError("At least two words must be provided")
            return;
        }
        electron.ipcRenderer.send(GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS, words);
    }

    const handleInputChange = () => {

    }

    const handleWordsInputChange = (e) => {
        const { value } = e.target;

        setForm({
            generatedWords: value.split(','),
            wordsInput: value,
        })
    }

    const copy = () => {
        navigator.clipboard.writeText(generatedPassword)
    }

    const reset = () => {
        setForm({
            wordsInput: '',
            length: 0,
            generatedWords: []
        })
        setGeneratedPassword('')
    }
    
    const onAddPasswordManagerClick = () => {
        history.push({
            pathname: ROUTES.NEW_WEBSITE,
            state: { generatedPassword }
        })
    }

    const filteredGeneratedWords = () => {
      return form.generatedWords.filter(item => item.length > 0);
    }

    return(<>
            <div className="right-generator">

                <div className="length-block-container mt-5">
                    <div className="length-block d-flex align-items-center justify-content-around">
                        Length :
                        <NumericInput min={8} handleChange={handleInputChange} defaultValue={form.length} />
                    </div>
                </div>

                <div className="input-block mt-5">
                    <input value={form.wordsInput} type="text" className="form-control" placeholder="Enter here..."
                           onChange={handleWordsInputChange} />
                    { error && <p className="invalid-text">{error}</p> }
                </div>

                <div className="generate-block mt-3">
                    <button disabled={filteredGeneratedWords().length < 2} className="btn btn-default btn-black w-100" onClick={generate}>Generate</button>
                </div>

                <div className="text-center mt-3">
                    <span className="generated-value">{generatedPassword}</span>
                </div>

                <div className="actions-block d-flex justify-content-center mt-3">
                    <button className="btn btn-black f-11" onClick={reset}>
                        <span className="action-text">Reset</span>
                    </button>
                    <button className="btn btn-black f-11" onClick={copy}>
                        <span className="action-text">
                            Copy
                        </span>
                    </button>
                    <button className="btn btn-black f-11" disabled={!generatedPassword.length} onClick={onAddPasswordManagerClick}>
                        <span className="action-text">
                            Add to Password Manager
                        </span>
                    </button>
                </div>
            </div>
        </>
    )
}

export default GivenWordsPasswordGenerator;
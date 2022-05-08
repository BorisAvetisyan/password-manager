import React, {useState} from "react";
import {
    GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS,
    GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS,
    ROUTES
} from "../utils/constants";
import {useHistory} from "react-router";
import {Badge} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRemove} from "@fortawesome/free-solid-svg-icons";

const electron = window.require('electron');
const inputAlphabet = ['0','1','2','3','4','5','6','7','8','9',"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

function GivenWordsPasswordGenerator() {
    const [error, setError] = useState('')
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [wordsBadges, setWordsBadges] = useState([]);
    const [form, setForm] = useState({
        currentWord: ''
    })
    const history = useHistory();

    electron.ipcRenderer.on(GENERATED_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS, (event, payload) => {
        setGeneratedPassword(payload);
    })

    const generate = () => {
        setError('');
        if(!wordsBadges.length || wordsBadges.length < 2) {
            setError("At least two words must be provided")
            return;
        }
        electron.ipcRenderer.send(GENERATE_RANDOM_PASSWORD_BASED_ON_GIVEN_WORDS, wordsBadges);
    }

    const handleWordsInputChange = (e) => {
        const { value } = e.target;
        const lastCharacter = value.charAt(e.target.value.length - 1);
        if(inputAlphabet.indexOf(lastCharacter) === -1) {
            const currentWord = value.slice(0, value.length - 1);
            setForm({...form, currentWord: currentWord});
            return;
        }
        setForm({...form, currentWord: value})
    }

    const copy = () => {
        navigator.clipboard.writeText(generatedPassword)
    }

    const reset = () => {
        setWordsBadges([]);
        setForm({
            currentWord: '',
        })
        setGeneratedPassword('')
    }
    
    const onAddPasswordManagerClick = () => {
        history.push({
            pathname: ROUTES.NEW_WEBSITE,
            state: { generatedPassword }
        })
    }

    const onInputKeyDown = (e) => {
        if(e.key === 'Enter' && e.target.value) {
            setWordsBadges([...wordsBadges, form.currentWord]);
            setForm({...form, currentWord: ''})
        }
    }

    const removeBadge = (index) => {
      setWordsBadges(wordsBadges.filter((item, i) => i !== index))
    }

    return(<>
            <div className="right-generator">
                <div className="length-block-container mt-5">
                    <p style={{color: "#727272", fontSize: "14px"}} className="text-center">
                        Type the words you want to use in your password below, press enter after each word.
                        We will generate a password based on those words and suggest you the strongest we got.
                    </p>
                </div>

                <div>
                    { wordsBadges.map((word, index) => (
                        <Badge bg="secondary" className="cursor-pointer mr-2">{word}

                            <span className="ml-5" onClick={() => removeBadge(index)}>
                                <FontAwesomeIcon icon={faRemove} />
                            </span>
                        </Badge>
                    )) }
                </div>

                <div className="input-block mt-3">
                    <input onKeyDown={onInputKeyDown} value={form.currentWord} type="text" className="form-control" placeholder="Enter here..."
                           onChange={handleWordsInputChange} />
                    { error && <p className="invalid-text">{error}</p> }
                </div>

                <div className="generate-block mt-3">
                    <button disabled={wordsBadges.length < 2} className="btn btn-default btn-black w-100" onClick={generate}>Generate</button>
                </div>

                <div className="text-center mt-3">
                    <span className="generated-value">{generatedPassword}</span>
                </div>

                {generatedPassword.length ? <div className="actions-block d-flex justify-content-center mt-3">
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
                </div> : <></>}

            </div>
        </>
    )
}

export default GivenWordsPasswordGenerator;
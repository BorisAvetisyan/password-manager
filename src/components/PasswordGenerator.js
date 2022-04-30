import React, {useState} from "react";
import {HelperIcon} from "../media/SVG";
import RandomPasswordGenerator from "./RandomPasswordGenerator";
import GivenWordsPasswordGenerator from "./GivenWordsPasswordGenerator";

function PasswordGenerator() {
    const [showRandomPasswordGenerator, setShowRandomPasswordGenerator] = useState(false);
    const [showGivenWordsPasswordGenerator, setShowGivenWordsPasswordGenerator] = useState(false);

    const onRandomPasswordGeneratorClick = () => {
        setShowRandomPasswordGenerator(true);
        setShowGivenWordsPasswordGenerator(false);
    }

    const onGivenWordsPasswordGeneratorClick = () => {
        setShowRandomPasswordGenerator(false);
        setShowGivenWordsPasswordGenerator(true);
    }

    return(
        <div className="container-fluid password-generator-container mt-4">
            <div className="row">
                <div className="col-6">
                    <div className="left-generator">
                        <div className="given-words-info-block text-center cursor-pointer" onClick={onGivenWordsPasswordGeneratorClick} >
                            <p className="header">ABC</p>
                            <p className="description">Random password based on given words</p>
                            <p className="guide">Enter comma seperated words and get a password</p>
                        </div>

                        <div className="random-password-generator-block text-center mt-3 cursor-pointer" onClick={onRandomPasswordGeneratorClick} >
                            <p>{ HelperIcon }</p>
                            <p className="description">Random Password generator</p>
                            <p className="guide">Select from checkbox requirements for random password:</p>
                        </div>

                    </div>
                </div>
                <div className="col-6">

                    { showRandomPasswordGenerator && <RandomPasswordGenerator /> }
                    { showGivenWordsPasswordGenerator && <GivenWordsPasswordGenerator /> }

                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator;
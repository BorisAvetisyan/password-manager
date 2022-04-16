import React from "react";
import {HelperIcon} from "../media/SVG";
import NumericInput from "./NumericInput";

function PasswordGenerator() {
    return(
        <div className="container-fluid password-generator-container">
            <div className="row">
                <div className="col-6">
                    <div className="left-generator">
                        <div className="given-words-info-block text-center">
                            <p className="header">ABC</p>
                            <p className="description">Random password based on given words</p>
                            <p className="guide">Enter comma seperated words and get a password</p>
                        </div>

                        <div className="length-block-container mt-5">
                            <div className="length-block d-flex align-items-center justify-content-around">
                                Length :
                                <NumericInput />
                            </div>

                        </div>

                        <div className="input-block mt-5">
                            <input type="text" className="form-control" placeholder="Enter here..." />
                        </div>

                        <div className="generate-block mt-3">
                            <button className="btn btn-default btn-black w-100">Generate</button>
                        </div>

                        <div className="text-center mt-3">
                            <span className="generated-value">F%(Q#L%ao</span>
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
                </div>

                <div className="col-6">
                    <div className="random-password-generator-block text-center">
                        <p>{ HelperIcon }</p>
                        <p className="description">Random Password generator</p>
                        <p className="guide">Select from checkbox requirements for random password:</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PasswordGenerator;
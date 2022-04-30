import NumericInput from "./common/NumericInput";
import React from "react";

function GivenWordsPasswordGenerator() {
    return(<>
            <div className="right-generator">

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
        </>
    )
}

export default GivenWordsPasswordGenerator;
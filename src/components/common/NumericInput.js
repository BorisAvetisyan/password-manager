import React, { memo, useState } from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../media/SVG";

function NumericInput({ handleChange }) {

    const [value, setValue] = useState(0)

    const onChange = (e) => {
      setValue(e.target.value);
      handleChange && handleChange(e.target.value)
    }

    return(
        <div className="numeric-input-block">
            <input type="number" min={0} className="custom-numeric-input text-center" value={value} onChange={(e) => onChange(e)} />
            <div className="input-arrow-up text-center cursor-pointer" onClick={() => setValue(value + 1) }>
                { ArrowUpIcon }
            </div>
            <div className="input-arrow-down text-center cursor-pointer" onClick={() => setValue(value - 1 >= 0 ? value - 1 : 0) }>
                { ArrowDownIcon }
            </div>
        </div>
    )
}

export default memo(NumericInput)
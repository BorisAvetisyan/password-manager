import React, {memo, useEffect, useState} from "react";
import { ArrowDownIcon, ArrowUpIcon } from "../../media/SVG";

function NumericInput({ handleChange, defaultValue = 0, min= 0}) {

    const [value, setValue] = useState(defaultValue)

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    const onChange = (e) => {
      setValue(e.target.value);
      handleChange && handleChange(e.target.value)
    }

    const onArrowClick = (value) => {
        setValue(value);
        handleChange && handleChange(value)
    }

    return(
        <div className="numeric-input-block">
            <input type="number" min={0} className="custom-numeric-input text-center" value={value} onChange={(e) => onChange(e)} />
            <div className="input-arrow-up text-center cursor-pointer" onClick={() => onArrowClick(value + 1) }>
                { ArrowUpIcon }
            </div>
            <div className="input-arrow-down text-center cursor-pointer" onClick={() => onArrowClick(value - 1 >= min ? value - 1 : min) }>
                { ArrowDownIcon }
            </div>
        </div>
    )
}

export default memo(NumericInput)
import PasswordInput from "./common/PasswordInput";
import VeryWeak from '../media/very_weak.jpg';
import Fear from '../media/fair.jpg';
import Weak from '../media/weak.jpg';
import Good from '../media/good.jpg';
import Strong from '../media/strong.jpg';
import {useState} from "react";

function PasswordChecker() {
    const Images = {
        0: VeryWeak,
        1: Weak,
        2: Fear,
        3: Good,
        4: Strong
    }
    const [imagePath, setImage] = useState(null);

    const handlePasswordInputChange = (e, score) => {
        if (!e.target.value.length) {
            setImage(null);
            return;
        }
        setImage(Images[score]);
    }

    return (
        <div className="analyzer-container">
            <PasswordInput handleChange={handlePasswordInputChange} placeHolder={"Analyze your password"}/>
            <div>
                {imagePath && <img src={imagePath}/>}
            </div>
        </div>
    )
}

export default PasswordChecker;
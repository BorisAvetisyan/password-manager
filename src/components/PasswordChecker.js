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
    const [passwordInfoMessage, setPasswordInfoMessage] = useState('');

    const handlePasswordInputChange = (e, passwordInfo) => {
        if (!e.target.value.length) {
            setImage(null);
            setPasswordInfoMessage('');
            return;
        }
        setPasswordInfoMessage("Hey! Your password can be hacked in " + passwordInfo.crack_times_display.offline_slow_hashing_1e4_per_second)
        setImage(Images[passwordInfo.score]);
    }

    return (
        <div className="analyzer-container">
            <PasswordInput allInfo={true} handleChange={handlePasswordInputChange} placeHolder={"Analyze your password"}/>
            <p className="">{passwordInfoMessage}</p>
            <div className="text-center">
                {imagePath && <img src={imagePath} style={{ width: "600px" }} />}
            </div>
        </div>
    )
}

export default PasswordChecker;
import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {EditIcon, ShowPasswordIcon} from "../media/SVG";
import moment from "moment";
import MasterPasswordModal from "./MasterPasswordModal";
import WebsiteIcon from "./common/WebsiteIcon";

function PasswordInfo() {
    const [passwordItem, setPasswordItem] = useState(null);
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [decryptedPassword, setDecryptedPassword] = useState('');
    const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);
    const {state} = history.location;

    useEffect(() => {
        setPasswordItem(state?.item)
    }, [state?.item])

    const handleCloseMasterPassword = (password) => {
        setShowMasterPasswordModal(false);
        setShowPassword(!!password);
        setDecryptedPassword(password);
    }

    return (
        <div className="info-block">
            {passwordItem &&
                <div className="info-row">
                    <div className="info-header">
                        <span className="website-icon">
                            <WebsiteIcon domain={passwordItem.url} />
                        </span>
                        <span className="info-url">{passwordItem.url}</span>
                    </div>
                    <div>
                        <ul className="info-ul mt-3">
                            <li className="info-field">
                                <span className="info-field-title">name</span> {passwordItem.name}
                            </li>
                            <li className="info-field">
                                <span className="info-field-title">password:</span> <br />{showPassword ? decryptedPassword : '•••••••••••••'}
                                {!showPassword ?

                                    <span className="show-password-icon" onClick={() => setShowMasterPasswordModal(true)} >
                                        { ShowPasswordIcon }
                                    </span>
                                    :
                                    <span className="edit-password-icon" onClick={() => setShowPassword(false)}>
                                        { EditIcon }
                                    </span>
                                }
                            </li>

                            <li className="info-field">
                                <span className="info-field-title">website:</span><br />
                                <span className="">{ passwordItem.url }</span>
                            </li>

                            <li className="info-field">
                                <span className="info-field-title">created:</span>
                                <br />
                                {moment.unix(parseInt(passwordItem.created_date)).format("MM/DD/YYYY")}
                            </li>
                            <li className="info-field">
                                <span className="info-field-title">last modified:</span> <br />
                                {moment.unix(parseInt(passwordItem.updated_date)).format("MM/DD/YYYY")}
                            </li>
                        </ul>
                    </div>
                </div>
            }

            {showMasterPasswordModal && <MasterPasswordModal passwordItem={passwordItem} handleClose={handleCloseMasterPassword}/>}

        </div>
    )
}

export default PasswordInfo;
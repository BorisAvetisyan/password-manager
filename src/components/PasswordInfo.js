import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {AddNewButton, DefaultWebsiteIcon, EditIcon, ShowPasswordIcon} from "../media/SVG";
import moment from "moment";
import MasterPasswordModal from "./MasterPasswordModal";

function PasswordInfo() {
    const [singleItem, setSingleItem] = useState(null);
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);
    const {state} = history.location;

    useEffect(() => {
        setSingleItem(state?.item)
    }, [state?.item])

    const handleCloseMasterPassword = (showPassword) => {
        console.log("show password is, ", !!showPassword)
        setShowMasterPasswordModal(false);
        setShowPassword(!!showPassword)
    }

    return (
        <div className="info-block">
            {singleItem &&
                <div className="info-row">
                    <div className="info-header">
                        <span className="website-icon">
                            {DefaultWebsiteIcon({width: 50, height: 50})}
                        </span>
                        <span className="info-url">{singleItem.url}</span>
                    </div>
                    <div>
                        <ul className="info-ul mt-3">
                            <li className="info-field">
                                <span className="info-field-title">name</span> {singleItem.name}
                            </li>
                            <li className="info-field">
                                <span className="info-field-title">password:</span> <br />{showPassword ? singleItem.password : '•••••••••••••'}
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
                                <span className="">{ singleItem.url }</span>
                            </li>

                            <li className="info-field">
                                <span className="info-field-title">created:</span>
                                <br />
                                {moment.unix(parseInt(singleItem.created_date)).format("MM/DD/YYYY")}
                            </li>
                            <li className="info-field">
                                <span className="info-field-title">last modified:</span> <br />
                                {moment.unix(parseInt(singleItem.updated_date)).format("MM/DD/YYYY")}
                            </li>
                        </ul>
                    </div>
                </div>
            }

            {showMasterPasswordModal && <MasterPasswordModal handleClose={handleCloseMasterPassword}/>}

        </div>
    )
}

export default PasswordInfo;
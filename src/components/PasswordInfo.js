import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {DefaultWebsiteIcon} from "../media/SVG";
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

    const add = () => {
        history.push('/new-website')
    }

    const handleCloseMasterPassword = (showPassword) => {
        console.log("show password is, ", !!showPassword)
        setShowMasterPasswordModal(false);
        setShowPassword(!!showPassword)
    }

    return (
        <div className="info-block">
            {singleItem &&
                <div className="info-row">
                <span className="website-icon">
                {DefaultWebsiteIcon({width: 50, height: 50})}
            </span>
                    <div>
                        <ul className="info-ul mt-3">
                            <li>
                                <b>Website</b> {singleItem.name}
                            </li>
                            <li>
                                <b>URL</b> {singleItem.url}
                            </li>
                            <li>
                                <b>Password</b> {showPassword ? singleItem.password : '**********'}
                                { !showPassword ?
                                    <button onClick={() => setShowMasterPasswordModal(true)}
                                                              className="btn btn-sm btn-success">Show
                                    </button>
                                    :
                                    <button onClick={() => setShowPassword(false)}
                                            className="btn btn-sm btn-success">Hide
                                    </button>
                                }
                            </li>
                            <li>
                                <b>Created Date</b> {moment(parseInt(singleItem.created_date)).format("Y/m/d")}
                            </li>
                            <li>
                                <b>Updated Date</b> {moment(parseInt(singleItem.updated_date)).format("Y/m/d")}
                            </li>
                        </ul>
                    </div>
                </div>
            }

            <button className="btn btn-secondary float-end m-3" onClick={add}>New</button>

            {showMasterPasswordModal && <MasterPasswordModal handleClose={handleCloseMasterPassword}/>}
        </div>
    )
}

export default PasswordInfo;
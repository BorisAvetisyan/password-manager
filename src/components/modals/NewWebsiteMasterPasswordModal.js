import {Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECKED_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD_SAVED,
    NEW_WEBSITE,
} from "../../utils/constants";
import PasswordInput from "../common/PasswordInput";
import zxcvbn from "zxcvbn";
import {useSelector} from "react-redux";

const electron = window.require('electron');

function NewWebsiteMasterPasswordModal({handleClose, formData}) {
    const [error, setError] = useState('');
    const [masterPassword, setMasterPassword] = useState('');
    const [invalidPasswordWarning, setInvalidPasswordWarning] = useState('');
    const { hasMasterPassword } = useSelector(state => state.app)

    useEffect(() => {
        electron.ipcRenderer
            .on(NEW_MASTER_PASSWORD_SAVED, () => {
                handleClose();
            })
            .on(CHECKED_MASTER_PASSWORD, (event, passedCredential) => {
                if (!passedCredential) {
                    setError("Wrong input");
                    return;
                }
                handleClose();
            })
    }, [handleClose])

    const save = () => {
        if (!masterPassword) {
            setError("Master Password is required");
            return;
        }
        const passwordInfo = zxcvbn(masterPassword, [])
        if (passwordInfo.score < 4) {
            setInvalidPasswordWarning("Master password should be strong");
           return;
        }
        const payload = {
            ...formData,
            masterPassword
        }
        if (!payload.url.length || !payload.name.length || !payload.password.length || !payload.masterPassword.length) {
            setError("Missing required fields")
            return;
        }
        if (!hasValidInputData(payload)) {
            setError("Form data cannot contain the symbol `,`");
            return;
        }

        if (!payload.url.includes('https://')) {
            payload.url = 'https://' + payload.url;
        }
        electron.ipcRenderer.send(NEW_WEBSITE, payload);
    }

    const hasValidInputData = (payload) => {
        return !payload.url.includes(',') &&
            !payload.name.includes(",") &&
            !payload.password.includes(",") &&
            !payload.masterPassword.includes(",")
    }

    const handlePasswordInputChange = (e) => {
        if (invalidPasswordWarning.length) {
            setInvalidPasswordWarning('')
        }
        setMasterPassword(e.target.value)
    }

    return (<Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please enter your master password and press save
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p className="invalid-text">{error}</p>}
                <PasswordInput showStrengthBlock={!hasMasterPassword}
                               error={invalidPasswordWarning}
                               label={false}
                               defaultValue={masterPassword}
                               handleChange={handlePasswordInputChange}/>
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">Close</button>
                <button className="btn btn-black" onClick={save}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewWebsiteMasterPasswordModal;
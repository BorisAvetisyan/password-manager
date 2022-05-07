import {Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECKED_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD_SAVED,
    NEW_WEBSITE,
} from "../../utils/constants";

const electron = window.require('electron');

function NewWebsiteMasterPasswordModal({ handleClose, formData }) {
    const [error, setError] = useState('');
    const [masterPassword, setMasterPassword] = useState('')

    useEffect(() => {
        electron.ipcRenderer
            .on(NEW_MASTER_PASSWORD_SAVED, () => {
                handleClose();
            })
            .on(CHECKED_MASTER_PASSWORD, (event, passedCredential) => {
                if(!passedCredential) {
                    setError("Wrong input");
                    return;
                }
                handleClose();
            })
    }, [handleClose])

    const save = () => {
        if(!masterPassword) {
            setError("Master Password is required");
            return;
        }
        const payload = {
            ...formData,
            masterPassword
        }
        if(!payload.url.length || !payload.name.length || !payload.password.length || !payload.masterPassword.length) {
            setError("Missing required fields")
            return;
        }
        if(!hasValidInputData(payload)) {
            setError("Form data cannot contain the symbol `,`");
            return;
        }

        if(!payload.url.includes('https://')) {
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

    return(<Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please enter your master password and press save
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p className="invalid-text">{error}</p>}
                <input className="form-control" placeholder="Password..." type="password" value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} />
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">Close</button>
                <button className="btn btn-black" onClick={save}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewWebsiteMasterPasswordModal;
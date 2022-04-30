
import { Modal } from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECK_MASTER_PASSWORD,
    CHECKED_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD_SAVED, NEW_WEBSITE, PASSWORD_DECRYPT, PASSWORD_DECRYPTED
} from "../utils/constants";

const electron = window.require('electron');

function MasterPasswordModal({ isNew, handleClose, passwordItem }) {
    const [masterPassword, setMasterPassword] = useState([])
    const [error, setError] = useState(null);

    useEffect(() => {
        electron.ipcRenderer
            .on(NEW_MASTER_PASSWORD_SAVED, () => {
            handleClose(true);
        })
            .on(CHECKED_MASTER_PASSWORD, (event, passedCredential) => {
                if(!passedCredential) {
                    setError("Master Password has wrong value");
                    return;
                }
                handleClose(true);
            })
            .on(PASSWORD_DECRYPTED, (event, payload) => {
                handleClose(payload);
            })
    }, [handleClose])

    const save = () => {
        if(!isNew) {
            showPassword();
        } else {
            handleClose(masterPassword);
        }
    }

    const showPassword = () => {
        if(!masterPassword) {
            handleClose();
            return;
        }
        const payload = {
            item: passwordItem,
            masterPassword
        }
        electron.ipcRenderer.send(PASSWORD_DECRYPT, payload);
    }

    const title = isNew ? 'Please enter your master password and press save' : ' Please enter your master password'
    const buttonText = isNew ? 'Save' : 'Submit'

    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    { title }
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p>{error}</p>}
                <input className="form-control" placeholder="Password..." type="password" value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} />
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">Close</button>
                <button className="btn btn-black" onClick={save}>{buttonText}</button>
            </Modal.Footer>
        </Modal>
    )
}

export default MasterPasswordModal;
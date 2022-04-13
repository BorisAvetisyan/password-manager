
import { Modal } from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECK_MASTER_PASSWORD,
    CHECKED_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD,
    NEW_MASTER_PASSWORD_SAVED
} from "../utils/constants";

const electron = window.require('electron');

function MasterPasswordModal({ isNew, handleClose }) {
    const [password, setPassword] = useState([])
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
    }, [handleClose])

    const save = () => {
        const event = isNew ? NEW_MASTER_PASSWORD : CHECK_MASTER_PASSWORD;
        electron.ipcRenderer.send(event, password);
    }

    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please fill your master password and press save
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p>{error}</p>}
                <input className="form-control" placeholder="Password..." type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">Close</button>
                <button className="btn btn-primary" onClick={save}>Save</button>
            </Modal.Footer>
        </Modal>
    )
}

export default MasterPasswordModal;
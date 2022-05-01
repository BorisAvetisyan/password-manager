import {Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECKED_MASTER_PASSWORD,
    PASSWORD_DECRYPT,
    PASSWORD_DECRYPTED
} from "../../utils/constants";

const electron = window.require('electron');

function MasterPasswordConfirmationModal({ passwordItem, handleClose }) {
    const [error, setError] = useState('');
    const [masterPassword, setMasterPassword] = useState('');

    useEffect(() => {
        electron.ipcRenderer
            .on(PASSWORD_DECRYPTED, (event, payload) => {
                handleClose(payload);
            })
            .on(CHECKED_MASTER_PASSWORD, (event, isCorrectPassword) => {
                if(!isCorrectPassword) {
                    setError("Wrong input")
                }
            })
    }, [handleClose])

    const confirm = () => {
        if(!masterPassword) {
            setError("Master Password is required")
            return;
        }
        const payload = {
            item: passwordItem,
            masterPassword
        }
        electron.ipcRenderer.send(PASSWORD_DECRYPT, payload);
    }

    return(
        <Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please enter your master password
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p className="invalid-text">{error}</p>}
                <input className="form-control" placeholder="Password..." type="password" value={masterPassword} onChange={(e) => setMasterPassword(e.target.value)} />
            </Modal.Body>

            <Modal.Footer>
                <button onClick={() => handleClose()} className="btn btn-secondary">Close</button>
                <button className="btn btn-black" onClick={confirm}>Confirm</button>
            </Modal.Footer>
        </Modal>
    )
}
export default MasterPasswordConfirmationModal
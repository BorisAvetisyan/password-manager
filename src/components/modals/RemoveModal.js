import {Modal} from "react-bootstrap";
import {useEffect, useState} from "react";
import {
    CHECKED_MASTER_PASSWORD,
    DELETE_PASSWORD_ITEM,
    EMPTY_MASTER_PASSWORD, PASSWORD_DELETED
} from "../../utils/constants";
import PasswordInput from "../common/PasswordInput";

const electron = window.require('electron');

function RemoveModal({ handleClose, id }) {
    const [error, setError] = useState('');
    const [masterPassword, setMasterPassword] = useState('')

    useEffect(() => {
        electron.ipcRenderer
            .on(EMPTY_MASTER_PASSWORD, () => {
                setError("Master Password is required")
            })
            .on(CHECKED_MASTER_PASSWORD, (event, passedCredential) => {
                !passedCredential && setError("Wrong input");
            })
            .on(PASSWORD_DELETED, () => {
                handleClose();
            })
    }, [])

    const removeItem = () => {
        setError('');

        if(!masterPassword.length) {
            setError("Master Password is required");
            return;
        }
        const payload = { id, masterPassword }
        electron.ipcRenderer.send(DELETE_PASSWORD_ITEM, payload);
    }

    return (<Modal show onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Please enter your master password and press delete
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {error && <p className="invalid-text">{error}</p>}
                <PasswordInput label={false} defaultValue={masterPassword} showStrengthBlock={false}
                    handleChange={(e) => setMasterPassword(e.target.value)} />
            </Modal.Body>

            <Modal.Footer>
                <button onClick={handleClose} className="btn btn-secondary">Close</button>
                <button className="btn btn-black" onClick={removeItem}>Delete</button>
            </Modal.Footer>
        </Modal>
    )
}

export default RemoveModal;
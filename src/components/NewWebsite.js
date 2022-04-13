import React, {useEffect, useState} from "react";
import ListBlock from "./ListBlock";
import {EMPTY_MASTER_PASSWORD, NEW_WEBSITE} from "../utils/constants";
import MasterPasswordModal from "./MasterPasswordModal";

const electron = window.require('electron');

function NewWebsite() {
    const [form, setForm] = useState({
        url: '',
        name: '',
        password: '',
    })
    const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);

    useEffect(() => {
        electron.ipcRenderer.on(EMPTY_MASTER_PASSWORD, () => {
            setShowMasterPasswordModal(true);
        })
    }, [])

    const handleChange = (type, e) => {
        setForm({...form, ...{ [type]: e.target.value } })
    }

    const handleCloseMasterPasswordModal = (isNewPasswordAdded) => {
        setShowMasterPasswordModal(false);
        if(isNewPasswordAdded) {
            save();
        }
    }

    const save = () => {
        if(!form.url.length || !form.name.length || !form.password.length) {
            return;
        }
        electron.ipcRenderer.send(NEW_WEBSITE, form);
    }

    return(
        <div className="password-manager d-flex">
            <ListBlock />
            <div className="new-website-container">

                <form>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={(e) => handleChange('name', e) }
                            type="text" className="form-control" id="name"
                            aria-describedby="emailHelp" placeholder="Enter Name" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="url">Website URL</label>
                        <input
                            onChange={(e) => handleChange('url', e) }
                            type="text" className="form-control" id="url"
                               aria-describedby="emailHelp" placeholder="Enter Website URL" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            onChange={(e) => handleChange('password', e) }
                            type="password" className="form-control" id="password"
                            aria-describedby="password" placeholder="Enter Website Password" />
                    </div>

                    <button onClick={save} type="button" className="btn btn-primary mt-2">Submit</button>
                </form>
            </div>

            { showMasterPasswordModal && <MasterPasswordModal isNew handleClose={handleCloseMasterPasswordModal} /> }

        </div>
    )
}

export default NewWebsite;
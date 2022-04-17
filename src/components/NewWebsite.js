import React, {useEffect, useState} from "react";
import ListBlock from "./ListBlock";
import {EMPTY_MASTER_PASSWORD, NEW_PASSWORD_ADDED, NEW_WEBSITE} from "../utils/constants";
import MasterPasswordModal from "./MasterPasswordModal";
import {useHistory} from "react-router";
import PasswordInput from "./PasswordInput";

const electron = window.require('electron');

function NewWebsite() {
    const [form, setForm] = useState({
        url: '',
        name: '',
        password: '',
    })
    const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);
    const history = useHistory();

    useEffect(() => {
        electron.ipcRenderer.on(EMPTY_MASTER_PASSWORD, () => {
                setShowMasterPasswordModal(true);
            })
            .on(NEW_PASSWORD_ADDED, (event, item) => {
                setForm({ url: "", name: "", password: "" })
                history.push({
                    pathname: 'manager',
                    state: { item }
                })
            })
    }, [history])

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
                        <label htmlFor="url">Website URL</label>
                        <input
                            onChange={(e) => handleChange('url', e) }
                            type="text" className="form-control" id="url"
                            aria-describedby="emailHelp" placeholder="Enter Website URL" />
                    </div>


                    <div className="form-group mt-1">
                        <label htmlFor="name">Username</label>
                        <input
                            onChange={(e) => handleChange('name', e) }
                            type="text" className="form-control" id="name"
                            aria-describedby="emailHelp" placeholder="Enter Name" />
                    </div>

                    <PasswordInput handleChange={(e) => handleChange('password', e)} />

                    <button onClick={save} type="button" className="btn btn-default mt-2 btn-black w-100">Save</button>
                </form>
            </div>

            { showMasterPasswordModal && <MasterPasswordModal isNew handleClose={handleCloseMasterPasswordModal} /> }

        </div>
    )
}

export default NewWebsite;
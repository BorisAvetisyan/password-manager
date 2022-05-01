import React, {useEffect, useState} from "react";
import ListBlock from "./list/ListBlock";
import {EMPTY_MASTER_PASSWORD, NEW_PASSWORD_ADDED, NEW_WEBSITE, ROUTES} from "../utils/constants";
import {useHistory} from "react-router";
import PasswordInput from "./common/PasswordInput";
import NewWebsiteMasterPasswordModal from "./modals/NewWebsiteMasterPasswordModal";

const electron = window.require('electron');

function NewWebsite() {
    const history = useHistory();
    const {state} = history.location;
    const [formData, setFormData] = useState({
        url: '',
        name: '',
        password: state?.generatedPassword || '',
    })
    const [showMasterPasswordModal, setShowMasterPasswordModal] = useState(false);

    useEffect(() => {
        setFormData({...formData, password: state?.generatedPassword || ''})
    }, [state])

    useEffect(() => {
        electron.ipcRenderer.on(EMPTY_MASTER_PASSWORD, () => {
                setShowMasterPasswordModal(true);
            })
            .on(NEW_PASSWORD_ADDED, (event, item) => {
                setFormData({ url: "", name: "", password: "" })
                history.push({
                    pathname: ROUTES.MANAGER,
                    state: { item }
                })
            })
    }, [history])

    const handleChange = (type, e) => {
        setFormData({...formData, ...{ [type]: e.target.value } })
    }

    const isDisabled = () => {
      return !formData.url.length || !formData.name.length || !formData.password.length;
    }

    return(
        <div className="password-manager d-flex">
            <ListBlock />
            <div className="new-website-container">
                <div className="new-website-form-block">
                    <form>
                        <div className="form-group">
                            <label htmlFor="url">Website URL*</label>
                            <input
                                onChange={(e) => handleChange('url', e) }
                                type="text" className="form-control" id="url"
                                aria-describedby="emailHelp" placeholder="Enter Website URL" />
                        </div>


                        <div className="form-group mt-1">
                            <label htmlFor="name">Username*</label>
                            <input
                                onChange={(e) => handleChange('name', e) }
                                type="text" className="form-control" id="name"
                                aria-describedby="emailHelp" placeholder="Enter Name" />
                        </div>

                        <PasswordInput defaultValue={formData.password} handleChange={(e) => handleChange('password', e)} />

                        <button disabled={isDisabled()} onClick={() => setShowMasterPasswordModal(true)} type="button" className="btn btn-default mt-2 btn-black w-100">Save</button>
                    </form>
                </div>
            </div>

            { showMasterPasswordModal && <NewWebsiteMasterPasswordModal formData={formData} handleClose={() => setShowMasterPasswordModal(false) } /> }

        </div>
    )
}

export default NewWebsite;
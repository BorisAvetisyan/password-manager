import ListBlock from "./ListBlock";
import PasswordInfo from "./PasswordInfo";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";
import {ROUTES} from "../utils/constants";
import {isObjectEmpty} from "../utils/helpers";

let electron;
if(typeof window.require === "function") {
    electron = window.require('electron');
}

function PasswordManager() {
    const { passwords } = useSelector(state => state.app)
    const history = useHistory();

    useEffect(() => {
        isObjectEmpty(passwords) && history.push(ROUTES.NEW_WEBSITE)
    }, [])

    return (
        <div className="password-manager d-flex">
            <ListBlock />
            <PasswordInfo />
        </div>
    );
}

export default PasswordManager;
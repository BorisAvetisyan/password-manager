import ListBlock from "./ListBlock";
import PasswordInfo from "./PasswordInfo";
import {AddNewButton} from "../media/SVG";

let electron;
if(typeof window.require === "function") {
    electron = window.require('electron');
}

function PasswordManager() {

    return (
        <div className="password-manager d-flex">
            <ListBlock />
            <PasswordInfo />

            {/*<span className="add-new-password cursor-pointer">*/}
            {/*    { AddNewButton }*/}
            {/*</span>*/}

        </div>
    );
}

export default PasswordManager;
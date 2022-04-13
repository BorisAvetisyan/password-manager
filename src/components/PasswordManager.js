import ListBlock from "./ListBlock";
import PasswordInfo from "./PasswordInfo";

let electron;
if(typeof window.require === "function") {
    electron = window.require('electron');
}

function PasswordManager() {

    return (
        <div className="password-manager d-flex">
            <ListBlock />
            <PasswordInfo />
        </div>
    );
}

export default PasswordManager;
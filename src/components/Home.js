import MenuBlock from "./MenuBlock";
import {Icon1, Icon2, Icon3} from "../media/SVG";
import {useHistory} from "react-router";
import {useEffect} from "react";
import {savePasswordsData} from "../redux/actions";
import {useDispatch} from "react-redux";
import {PASSWORDS_DATA} from "../utils/constants";

let electron;
if(typeof window.require === "function") {
    electron = window.require('electron');
}

function Home() {
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(() => {
        electron && electron.ipcRenderer.on(PASSWORDS_DATA, (event, data) => {
            dispatch(savePasswordsData(data))
        })
    }, [dispatch])

    const historyPush = (path) => {
        history.push(path)
    }

    return (
        <div className="row">
            <div className="col-12 d-flex justify-content-around menu-blocks-container">
                <div className={"row"}>
                    <MenuBlock title="Password Manager" icon={Icon1} event={() => historyPush('manager') } />
                    <MenuBlock title="Password Strength checker" icon={Icon2} event={() => historyPush('checker') } />
                    <MenuBlock title="Password generator" icon={Icon3} event={() => historyPush('generator') } />
                </div>
            </div>
        </div>
    )
}

export default Home;
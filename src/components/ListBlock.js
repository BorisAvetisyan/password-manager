import {useEffect, useState} from "react";
import {useHistory} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import List from "./List";
import {PASSWORDS_DATA, ROUTES} from "../utils/constants";
import {savePasswordsData} from "../redux/actions";
import {AddNewButton} from "../media/SVG";

let electron;
if(typeof window.require === "function") {
    electron = window.require('electron');
}

function ListBlock() {

    const { passwords } = useSelector(state => state.app)
    const [passwordsData, setPasswordsData] = useState(passwords);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        setPasswordsData(passwords);
    }, [passwords])

    useEffect(() => {
        electron && electron.ipcRenderer.on(PASSWORDS_DATA, (event, data) => {
            if(data.length) {
                dispatch(savePasswordsData(data))
            } else {
                console.log("push into history")
                history.push(ROUTES.NEW_WEBSITE)
            }
        })
    }, [dispatch])

    const filter = (e) => {
        let target = e.target.value
        if(!target.length) {
            setPasswordsData({...passwords});
            return;
        }
        const object = {...passwordsData};
        for(const prop in object) {
            const value = object[prop];
            object[prop] = value.filter(
                item => {
                    target = target.toLowerCase();
                    return item.name.toLowerCase().includes(target)
                     || item.url.toLowerCase().includes(target)
                }
            )
        }
        setPasswordsData(object);
    }

    const add = () => {
        history.push(ROUTES.NEW_WEBSITE);
        window.scrollTo(0, 0);
    }

    return (
        <div className="list-block">

            <div className="input-group search-websites">
                <input type="text" className="form-control" onChange={filter} placeholder="Search..." />
                    <div className="input-group-addon">
                        <button className="btn bg-transparent">
                            <i className="fa fa-times" />
                        </button>
                    </div>
            </div>

            <List data={passwordsData} />

            <span className="add-new-password cursor-pointer" onClick={add} >
                { AddNewButton }
            </span>
        </div>
)}

export default ListBlock;
import {HomeIcon} from "../media/SVG";
import {useHistory} from "react-router";

function Header() {
    const history = useHistory();

    const onHomeIconClick = () => {
        history.push('/')
    }

    return (
        <div className="header-container d-flex align-items-center">
            <div className="home">
                <span className="home-icon" onClick={onHomeIconClick} >{ HomeIcon }</span>
            </div>
            <div className="header-texts">
                <span className="title-text">Your Secure P@s5w0rd</span>
                <p className="title-description m-0">Store your passwords securely with our password manager</p>
            </div>
        </div>
    )
}

export default Header;
import WebsiteIcon from "../common/WebsiteIcon";
import {faRemove} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function ListItem({ item, onListItemClick, isSelected, handleRemove }) {

    return(
        <li  key={item.name} className={"list-item " + ( isSelected ? ' list-item-selected' : '')} onClick={() => onListItemClick(item)}>
            <span className="website-icon">
                <WebsiteIcon domain={item.url} width={"40px"} height={"40px"} />
            </span>
            <span className="website-name">
                { item.name }
            </span>
            <span className="remove-icon" onClick={handleRemove}>
               ` <FontAwesomeIcon icon={faRemove} />`
            </span>
        </li>
    )
}

export default ListItem;
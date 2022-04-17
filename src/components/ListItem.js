import {DefaultWebsiteIcon} from "../media/SVG";

function ListItem({ item, onListItemClick, isSelected }) {

    return(
        <li className={"list-item " + ( isSelected ? ' list-item-selected' : '')} onClick={() => onListItemClick(item)}>
            <span className="website-icon">
            { DefaultWebsiteIcon() }
            </span>
            <span className="website-name">
                { item.name }
            </span>
        </li>
    )
}

export default ListItem;
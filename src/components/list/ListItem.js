import WebsiteIcon from "../common/WebsiteIcon";

function ListItem({ item, onListItemClick, isSelected }) {

    return(
        <li  key={item.name} className={"list-item " + ( isSelected ? ' list-item-selected' : '')} onClick={() => onListItemClick(item)}>
            <span className="website-icon">
                <WebsiteIcon domain={item.url} width={"40px"} height={"40px"} />
            </span>
            <span className="website-name">
                { item.name }
            </span>
        </li>
    )
}

export default ListItem;
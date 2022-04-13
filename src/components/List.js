import ListItem from "./ListItem";
import {useHistory} from "react-router";

function List({data}) {
    const history = useHistory();

    const onListItemClick = (item) => {
        history.push({
            pathname: 'manager',
            state: {item}
        })
    }

    const isSelectedItem = (singleItem) => {
        const state = history.location.state
        if(state?.item) {
            return singleItem.id === state.item.id
        }
    }

    return (
        <ul className="list">
            {data.map(item => (
                <ListItem isSelected={isSelectedItem(item)} key={JSON.stringify(item)} item={item}
                          onListItemClick={onListItemClick}/>
            ))}
        </ul>
    )
}

export default List;
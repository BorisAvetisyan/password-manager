import {useHistory} from "react-router";
import ListItem from "./ListItem";
import {useState} from "react";
import RemoveModal from "../modals/RemoveModal";

function List({ data }) {
    const history = useHistory();
    const [listItemId, setListItemId] = useState(null);

    const onListItemClick = (item) => {
        history.push({
            pathname: 'manager',
            state: {item}
        })
        window.scrollTo(0, 0)
    }

    const isSelectedItem = (singleItem) => {
        const state = history.location.state
        if(state?.item) {
            return singleItem.id === state.item.id
        }
    }

    return (
        <>
            <ul className="list">
                { Object.keys(data).map((item, index) => {
                    return (
                        <>
                            { data[item] && data[item].length ? <li className="list-item li-namespace" key={item}>{item}</li> : <></>}
                            { data[item].map(item => (
                                <ListItem handleRemove={() => setListItemId(item.id) } isSelected={isSelectedItem(item)} key={JSON.stringify(item)} item={item}
                                          onListItemClick={onListItemClick} />
                            ))}
                            <li className="horizontal-separator" key={index} />
                        </>
                    )
                })}
            </ul>
            { listItemId &&
                <RemoveModal
                    handleClose={() => setListItemId(null) }
                    id={listItemId}
                /> }
        </>
    )
}

export default List;
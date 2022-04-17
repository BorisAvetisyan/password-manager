import {useHistory} from "react-router";
import ListItem from "./ListItem";

function List({ data }) {
    const history = useHistory();

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
        <ul className="list">
            { Object.keys(data).map((item, index) => {
                return (
                    <>
                        { data[item] && data[item].length ? <li className="list-item li-namespace" key={item}>{item}</li> : <></>}
                        { data[item].map(item => (
                            <ListItem isSelected={isSelectedItem(item)} key={JSON.stringify(item)} item={item}
                                      onListItemClick={onListItemClick} />
                        ))}
                        <li className="horizontal-separator" key={index} />
                    </>
                )
            })}
        </ul>
    )
}

export default List;
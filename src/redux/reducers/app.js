import {SAVE_PASSWORDS_DATA, SHOW_LIST_ITEM} from "../actions";

const initialState = {
    passwords: [],
    singleItem: null
};

export const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case SAVE_PASSWORDS_DATA:
            return {
                ...initialState,
                passwords: action.payload
            }
        case SHOW_LIST_ITEM:
            return {
                ...state,
                singleItem: action.payload
            }
        default:
            return initialState;
    }
}

export default AppReducer;
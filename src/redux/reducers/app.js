import {SAVE_PASSWORDS_DATA, SHOW_LIST_ITEM} from "../actions";

const initialState = {
    passwords: [],
    singleItem: null,
    hasMasterPassword: false
};

export const AppReducer = (state = initialState, action) => {

    switch (action.type) {
        case SAVE_PASSWORDS_DATA:
            const { passwords } = action.payload;
            return {
                ...initialState,
                passwords,
                hasMasterPassword: action.payload.hasMasterPassword
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
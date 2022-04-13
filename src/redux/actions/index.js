export const SAVE_PASSWORDS_DATA = 'SAVE_PASSWORDS_DATA';
export const SHOW_LIST_ITEM = 'SHOW_LIST_ITEM';

export const savePasswordsData = (payload) => {
    return {
        type: SAVE_PASSWORDS_DATA,
        payload: payload
    }
}
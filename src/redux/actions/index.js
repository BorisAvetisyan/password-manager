export const SAVE_PASSWORDS_DATA = 'SAVE_PASSWORDS_DATA';
export const SHOW_LIST_ITEM = 'SHOW_LIST_ITEM';

export const savePasswordsData = (payload) => {
    const data = payload.passwords;
    const map = {};
    data.forEach(item => {
        const firstCharacter = item.name.charAt(0).toUpperCase();
        const data = map[firstCharacter];
        if(data === undefined) {
            map[firstCharacter] = [item];
        } else {
            data.push(item)
        }
    })

    return {
        type: SAVE_PASSWORDS_DATA,
        payload: {
            passwords: map,
            hasMasterPassword: payload.hasMasterPassword
        }
    }
}
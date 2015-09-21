
export const ADD_SWITCH = "ADD_SWITCH";
export function addSwitch(id) {
    return {type: ADD_SWITCH, id};
}

export const REMOVE_SWITCH = "REMOVE_SWITCH";
export function removeSwitch(id) {
    return {type: REMOVE_SWITCH, id};
}

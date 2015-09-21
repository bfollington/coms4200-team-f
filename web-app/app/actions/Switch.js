
export const ADD_SWITCH = "ADD_SWITCH";
export function addSwitch(id) {
    return {type: ADD_SWITCH, id};
}

export const REMOVE_SWITCH = "REMOVE_SWITCH";
export function removeSwitch(id) {

    // TODO: remove all links associated with the switch when it disappears?

    return {type: REMOVE_SWITCH, id};
}

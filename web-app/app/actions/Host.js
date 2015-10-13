
export const ADD_HOST = "ADD_HOST";
export function addHost(id) {
    return {type: ADD_HOST, id};
}

export const REMOVE_HOST = "REMOVE_HOST";
export function removeHost(id) {
    return {type: REMOVE_HOST, id};
}

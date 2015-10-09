
export const ADD_LINK = "ADD_LINK";
export function addLink(from, from_port, to, to_port) {
    return {type: ADD_LINK, from, from_port, to, to_port};
}

export const REMOVE_LINK = "REMOVE_LINK";
export function removeLink(from, to) {
    return {type: REMOVE_LINK, from, to};
}

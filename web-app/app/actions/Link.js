
export const ADD_LINK = "ADD_LINK";
export function addLink(from, to) {
    return {type: ADD_LINK, from, to};
}

export const REMOVE_LINK = "REMOVE_LINK";
export function removeLink(from, to) {
    return {type: REMOVE_LINK, from, to};
}

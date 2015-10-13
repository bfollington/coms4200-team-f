
export const ADD_HOST_LINK = "ADD_HOST_LINK";
export function addHostLink(host, _switch) {
    return {type: ADD_HOST_LINK, host, _switch};
}

export const REMOVE_HOST_LINK = "REMOVE_HOST_LINK";
export function removeHostLink(host, _switch) {
    return {type: REMOVE_HOST_LINK, host, _switch};
}


export const SHOW_ACTION_LOG = "SHOW_ACTION_LOG";
export function showActionLog() {
    return {type: SHOW_ACTION_LOG};
}

export const HIDE_ACTION_LOG = "HIDE_ACTION_LOG";
export function hideActionLog() {
    return {type: HIDE_ACTION_LOG};
}

export const LOG_EVENT = "LOG_EVENT";
export function logEvent(message) {
    return {type: LOG_EVENT, message};
}

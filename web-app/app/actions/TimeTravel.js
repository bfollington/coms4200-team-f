
export const JUMP_TO_STATE = "JUMP_TO_STATE";
export function jumpToState(state) {
    return {type: JUMP_TO_STATE, state};
}

export const RETURN_TO_NORMAL = "RETURN_TO_NORMAL";
export function returnToNormal() {
    return {type: RETURN_TO_NORMAL};
}

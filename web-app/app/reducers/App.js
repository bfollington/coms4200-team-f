import {
    TOGGLE_LIVE_UPDATE
} from "actions/LiveUpdate";

import {
    JUMP_TO_STATE, RETURN_TO_NORMAL
} from "actions/TimeTravel";

import _ from "lodash";

function appState(state = {
    liveUpdate: true,
    isTimeTravelling: false,
    selectedState: {}
}, action) {
    switch (action.type) {

    case TOGGLE_LIVE_UPDATE:
        return _.assign(state, {
            liveUpdate: !state.liveUpdate
        });

    case JUMP_TO_STATE:
        return _.assign(state, {
            isTimeTravelling: true,
            selectedState: action.state
        });

    case RETURN_TO_NORMAL:
        return _.assign(state, {
            isTimeTravelling: false,
            selectedState: {}
        });

    default:
        return state;
    }
}

export default appState;

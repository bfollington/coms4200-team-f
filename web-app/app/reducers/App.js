import {
    TOGGLE_LIVE_UPDATE
} from "actions/LiveUpdate";

import {
    JUMP_TO_STATE, RETURN_TO_NORMAL
} from "actions/TimeTravel";

import {
    SHOW_ACTION_LOG, HIDE_ACTION_LOG, LOG_EVENT
} from "actions/App";

import _ from "lodash";

function appState(state = {
    liveUpdate: true,
    isTimeTravelling: false,
    selectedState: {},
    viewEventLog: false,
    eventLog: []
}, action) {
    switch (action.type) {

    case LOG_EVENT:
        return _.assign(state, {
            eventLog: state.eventLog.concat(action.message)
        });


    case SHOW_ACTION_LOG:
        return _.assign(state, {
            viewEventLog: true
        });

    case HIDE_ACTION_LOG:
        return _.assign(state, {
            viewEventLog: false
        });

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

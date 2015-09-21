import {
    ADD_SWITCH, REMOVE_SWITCH
} from "actions/Switch";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function switchState(state = {
    items: {}
}, action) {
    switch (action.type) {

    case ADD_SWITCH:
        return _.assign(state, {
            items: _.assign(state.items, {
                [action.id]: action.id
            })
        });


    case REMOVE_SWITCH:
        return _.assign(state, {
            items: _.assign(state.items, {
                [action.id]: null
            })
        });

    case CLEAR_NETWORK:
        return _.assign(state, {
            items: {}
        });

    default:
        return state;
    }
}

export default switchState;

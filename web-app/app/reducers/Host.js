import {
    ADD_HOST, REMOVE_HOST
} from "actions/Host";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function hostState(state = {
    items: {}
}, action) {
    switch (action.type) {

    case ADD_HOST:
        return _.assign(state, {
            items: _.assign(state.items, {
                [action.id]: action.id
            })
        });


    case REMOVE_HOST:
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

export default hostState;

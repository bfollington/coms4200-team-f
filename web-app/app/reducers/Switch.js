import {
    ADD_SWITCH, REMOVE_SWITCH
} from "actions/Switch";

import _ from "lodash";

function module(state = {
    items: {}
}, action) {
    switch (action.type) {

    case ADD_SWITCH:
        return _.assign(state, {
            items: {
                [action.id]: action.id
            }
        });


    case REMOVE_SWITCH:
        return _.assign(state, {
            items: {
                [action.id]: null
            }
        });

    default:
        return state;
    }
}

export default module;

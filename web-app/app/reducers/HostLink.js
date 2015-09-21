import {
    ADD_HOST_LINK, REMOVE_HOST_LINK
} from "actions/HostLink";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function genLinkId(host, _switch) {
    return `${_switch}->${host}`;
}

function linkState(state = {
    host: null,
    _switch: null,
    isUp: false
}, action) {

    switch (action.type) {

    case ADD_HOST_LINK:
        return _.assign(state, {
            host: action.host,
            _switch: action._switch,
            isUp: true
        });


    case REMOVE_HOST_LINK:
        return _.assign(state, {
            host: null,
            _switch: null,
            isUp: false
        });

    default:
        return state;
    }

}

function hostLink(state = {
    items: {}
}, action) {
    switch (action.type) {

    case ADD_HOST_LINK:
    case REMOVE_HOST_LINK:

        var id = genLinkId(action.host, action._switch);

        return _.assign(state, {
            items: _.assign(state.items, {
                [id]: linkState(state.items[id], action)
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

export default hostLink;

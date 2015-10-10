import {
    ADD_LINK, REMOVE_LINK
} from "actions/Link";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function genLinkId(s1, s2) {
    return `${s1}<->${s2}`;
}

function linkState(state = {
    from: null,
    to: null,
    isUp: false
}, action) {

    switch (action.type) {

    case ADD_LINK:
        return _.assign(state, {
            from: action.from,
            from_port: action.from_port,
            to: action.to,
            to_port: action.to_port,
            isUp: true
        });


    case REMOVE_LINK:
        return _.assign(state, {
            from: null,
            from_port: null,
            to: null,
            to_port: null,
            isUp: false
        });

    default:
        return state;
    }

}

function link(state = {
    items: {}
}, action) {
    switch (action.type) {

    // TODO: handle port stats messages and calculate link traffic using dpid and port num

    case ADD_LINK:
    case REMOVE_LINK:

        var id = genLinkId(action.from, action.to);

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

export default link;

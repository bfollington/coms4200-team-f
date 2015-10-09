import {
    ADD_SWITCH, REMOVE_SWITCH, UPDATE_FLOW_STATS, UPDATE_PORT_STATS
} from "actions/Switch";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function switchData(state = {
    id: null,
    ports: {},
    flows: {},
    total_bytes: 0,
    total_packets: 0,
    byte_rate: 0,
    packet_rate: 0,
    sampling_period: 0
}, action) {

    switch(action.type) {

    case ADD_SWITCH:
        return _.assign(state, {
            id: action.id
        });

    case UPDATE_FLOW_STATS:
        return _.assign(state, {
            flows: action.flows,
            total_packets: action.total_packets,
            total_bytes: action.total_bytes,
            sampling_period: action.sampling_period,
            byte_rate: (action.total_bytes - state.total_bytes) / action.sampling_period,
            packet_rate: (action.total_packets - state.total_packets) / action.sampling_period
        });

    case UPDATE_PORT_STATS:
        return _.assign(state, {
            ports: action.ports,
            sampling_period: action.sampling_period
        });
    }

}

function switchState(state = {
    items: {}
}, action) {
    switch (action.type) {

    case UPDATE_FLOW_STATS:
    case UPDATE_PORT_STATS:
    case ADD_SWITCH:
        return _.assign(state, {
            items: _.assign(state.items, {
                [action.id]: switchData(state.items[action.id], action)
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

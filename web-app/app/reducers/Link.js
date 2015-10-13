import {
    ADD_LINK, REMOVE_LINK
} from "actions/Link";

import {
    UPDATE_PORT_STATS
} from "actions/Switch";

import { CLEAR_NETWORK } from "actions/ClearNetwork";

import _ from "lodash";

function genLinkId(s1, s2) {
    return `${s1}<->${s2}`;
}

function linkState(state = {
    from: null,
    to: null,
    isUp: false,
    stats: {
        total_bytes: 0,
        total_packets: 0,
        byte_rate: 0,
        packet_rate: 0,
        sampling_period: 0
    }
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

    case UPDATE_PORT_STATS:
        return _.assign(state, {
            stats: {
                total_bytes: action.stats.rx_bytes + action.stats.tx_bytes,
                total_packets: action.stats.rx_packets + action.stats.tx_packets,
                sampling_period: action.sampling_period,
                byte_rate: (action.stats.rx_bytes + action.stats.tx_bytes - state.stats.total_bytes) / action.sampling_period,
                packet_rate: (action.stats.rx_packets + action.stats.tx_packets - state.stats.total_packets) / action.sampling_period
            }
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

function processPortStats(state, comparisonId, comparisonPort, action, portData) {
    var newState = state;

    // We want to see if both the id and port number of this link match up
    // If they do, then these stats apply to us
    if (comparisonId == action.id) {
        for (var i = 0; i < action.ports.length; i++) {
            // Check each port stats port number
            if (action.ports[i].data.port_no == comparisonPort) {
                // console.log("match", comparisonId, comparisonPort, action.id, action.ports[i].data.port_no);

                // We have a match, so save these stats
                // FIXME: these can reverse, since we check both ends of a link.
                let id = genLinkId(portData.from, portData.to);
                newState = _.assign(newState, {
                    items: _.assign(newState.items, {
                        // FIXME: Should be a new action really
                        [id]: linkState(newState.items[id], {type: UPDATE_PORT_STATS, sampling_period: action.sampling_period, stats: action.ports[i].data})
                    })
                });
            }
        }

        return newState;
    } else {
        return state;
    }
}

function link(state = {
    items: {}
}, action) {
    switch (action.type) {

    case UPDATE_PORT_STATS:
        var newState = state;

        for (var port in state.items) {
            var portData = state.items[port];

            // newState = processPortStats(newState, portData.from, portData.from_port, action, portData);
            newState = processPortStats(newState, portData.to, portData.to_port, action, portData);
        }

        return newState;


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

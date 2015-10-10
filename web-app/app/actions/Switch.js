
export const ADD_SWITCH = "ADD_SWITCH";
export function addSwitch(id) {
    return {type: ADD_SWITCH, id};
}

export const REMOVE_SWITCH = "REMOVE_SWITCH";
export function removeSwitch(id) {

    // TODO: remove all links associated with the switch when it disappears?

    return {type: REMOVE_SWITCH, id};
}

export const UPDATE_FLOW_STATS = "UPDATE_FLOW_STATS";
export function updateFlowStats(id, total_bytes, total_packets, total_flows, flows, sampling_period) {
    return {type: UPDATE_FLOW_STATS, id, total_bytes, total_packets, total_flows, flows, sampling_period};
}

export const UPDATE_PORT_STATS = "UPDATE_PORT_STATS";
export function updatePortStats(id, ports, sampling_period) {
    return {type: UPDATE_PORT_STATS, id, ports, sampling_period};
}

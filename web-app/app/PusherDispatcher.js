import {
    addSwitch, removeSwitch, updateFlowStats, updatePortStats
} from "actions/Switch";

import {
    addHost, removeHost
} from "actions/Host";

import {
    addHostLink, removeHostLink
} from "actions/HostLink";

import {
    addLink, removeLink
} from "actions/Link";

import { clearNetwork } from "actions/ClearNetwork";


const SPECIAL_CASE = {
    //if we get a BatchMessage, we want to extract all the actions and dispatch them one by one
    "BatchMessage": (message, dispatch) => {
        message.data.messages.map(m => {
            processMessage(m, dispatch);
        })
    }
}

const ACTION_MAP = {
    "SwitchAddedMessage": message => addSwitch(message.data.id),
    "SwitchRemovedMessage": message => removeSwitch(message.data.id),
    "HostAddedMessage": message => addHost(message.data.id),
    "HostRemovedMessage": message => removeHost(message.data.id),
    "SwitchHostLinkAddedMessage": message => addHostLink(message.data.host, message.data.switch),
    "SwitchHostLinkRemovedMessage": message => removeHostLink(message.data.host, message.data.switch),
    "LinkAddedMessage": message => addLink(message.data.start, message.data.start_port, message.data.end, message.data.end_port),
    "LinkRemovedMessage": message => removeLink(message.data.start, message.data.end),
    "ClearMessage": message => clearNetwork(),
    "SwitchStatsMessage": message => updatePortStats(message.data.id, message.data.ports, message.data.sampling_period),
    // "AllFlowStatsForSwitchMessage": message => updateFlowStats(message.data.id, message.data.total_bytes, message.data.total_packets, message.data.total_flows, message.data.flows, message.data.sampling_period)
};

function processMessage(message, dispatch) {
    // console.log("Received", message);

    if (SPECIAL_CASE[message.type]) {
        SPECIAL_CASE[message.type](message, dispatch);
    } else {
        if (ACTION_MAP[message.type]) {
            dispatch(ACTION_MAP[message.type](message));
        } else {
            console.warn("Pusher message was received with no action mapping", message);
        }
    }
}

export default class PusherDispatcher {
    constructor(apiKey, stream, dispatch) {
        this.dispatch = dispatch;
        this.apiKey = apiKey;

        this.pusher = new Pusher(apiKey);
        this.stream = this.pusher.subscribe(stream);

        // dispatch(addSwitch("s1"));
        // dispatch(addSwitch("s2"));
        // dispatch(addSwitch("s3"));

        // dispatch(addHost("h1"));
        // dispatch(addHost("h2"));

        // dispatch(addLink("s3", 1, "s2", 1));
        // dispatch(addLink("s1", 1, "s2", 2));

        // dispatch(addHostLink("h1", "s2"));
        // dispatch(addHostLink("h2", "s2"));
    }

    onMessage(message) {
        processMessage(message, this.dispatch);
    }

    // Provide a list of message ids to subscribe to, can be used to filter the stream
    subscribeToMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
          console.log('Binding message', messages[i]);
          this.stream.bind(messages[i], this.onMessage.bind(this));
        }
    }
}

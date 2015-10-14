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
import { logEvent } from "actions/App";

import History from "History";

var history = new History();
window.eventHistory = history;

const SPECIAL_CASE = {
    //if we get a BatchMessage, we want to extract all the actions and dispatch them one by one
    "BatchMessage": (message, dispatch, store) => {
        message.data.messages.map(m => {
            processMessage(m, dispatch, store, false);
        })
    },
    "SyncMessage": (message, dispatch, store) => {
        message.data.messages.map(m => {
            processMessage(m, dispatch, store, true);
        })
    }
}

const HISTORY_EVENTS = [
    "SwitchAddedMessage",
    "SwitchRemovedMessage",
    "HostAddedMessage",
    "HostRemovedMessage",
    "SwitchHostLinkAddedMessage",
    "SwitchHostLinkRemovedMessage",
    "LinkAddedMessage",
    "LinkRemovedMessage"
];

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

function processMessage(message, dispatch, store, isSyncMessage = false) {
    // console.log("Received", message);

    if (SPECIAL_CASE[message.type]) {
        SPECIAL_CASE[message.type](message, dispatch, store);
    } else {
        if (ACTION_MAP[message.type]) {
            if (!isSyncMessage && HISTORY_EVENTS.indexOf(message.type) >= 0) {
                history.addEvent(message.time, message, store.getState());
            }

            dispatch(ACTION_MAP[message.type](message));
        } else {
            console.warn("Pusher message was received with no action mapping", message);
        }
    }
}

export default class PusherDispatcher {
    constructor(apiKey, stream, store) {
        this.dispatch = store.dispatch;
        this.store = store;
        this.apiKey = apiKey;
        this.streamName = stream;

        this.pusher = new Pusher(apiKey);
        this.stream = this.pusher.subscribe(stream);
    }

    tearDown() {
        // this.pusher.unsubscribe(this.streamName);
        this.pusher.disconnect();
    }

    onMessage(message) {
        if (this.store.getState().App.liveUpdate) {
            processMessage(message, this.dispatch, this.store);
            this.dispatch(logEvent(message));
        }
    }

    // Provide a list of message ids to subscribe to, can be used to filter the stream
    subscribeToMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
          console.log('Binding message', messages[i]);
          this.stream.bind(messages[i], this.onMessage.bind(this));
        }
    }
}

import {
    addSwitch, removeSwitch
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

const ACTION_MAP = {
    "SwitchAddedMessage": message => addSwitch(message.data.id),
    "SwitchRemovedMessage": message => removeSwitch(message.data.id),
    "HostAddedMessage": message => addHost(message.data.id),
    "HostRemovedMessage": message => removeHost(message.data.id),
    "SwitchHostLinkAddedMessage": message => addHostLink(message.data.host, message.data.switch),
    "SwitchHostLinkRemovedMessage": message => removeHostLink(message.data.host, message.data.switch),
    "LinkAddedMessage": message => addLink(message.data.start, message.data.end),
    "LinkRemovedMessage": message => removeLink(message.data.start, message.data.end),
    "ClearMessage": message => clearNetwork()
};

export default class PusherDispatcher {
    constructor(apiKey, stream, dispatch) {
        this.dispatch = dispatch;
        this.apiKey = apiKey;

        this.pusher = new Pusher(apiKey);
        this.stream = this.pusher.subscribe(stream);
    }

    onMessage(message) {
      console.log("Received", message);

      if (ACTION_MAP[message.type]) {
        this.dispatch(ACTION_MAP[message.type](message));
      } else {
        console.warn("Pusher message was received with no action mapping", message);
      }
    }

    subscribeToMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
          console.log('Binding message', messages[i]);
          this.stream.bind(messages[i], this.onMessage.bind(this));
        }
    }
}

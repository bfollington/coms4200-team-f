import {
    ADD_SWITCH, REMOVE_SWITCH,
    addSwitch, removeSwitch
} from "actions/Switch";

const ACTION_MAP = {
    "SwitchAddedMessage": message => addSwitch(message.data.id),
    "SwitchRemovedMessage": message => removeSwitch(message.data.id)
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
      }
    }

    subscribeToMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
          console.log('Binding message', messages[i]);
          this.stream.bind(messages[i], this.onMessage.bind(this));
        }
    }
}

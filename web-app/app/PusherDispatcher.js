export default class PusherDispatcher {
    constructor(apiKey, stream, dispatch) {
        this.dispatch = dispatch;
        this.apiKey = apiKey;

        this.pusher = new Pusher(apiKey);
        this.stream = this.pusher.subscribe(stream);
    }

    onMessage(message) {
      console.log("Received", message);
    }

    subscribeToMessages(messages) {
        for (var i = 0; i < messages.length; i++) {
          console.log('Binding message', messages[i]);
          this.stream.bind(messages[i], this.onMessage.bind(this));
        }
    }
}

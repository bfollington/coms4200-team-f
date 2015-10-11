import _ from "lodash";

export default class History {
    constructor() {
        this.clearHistory();
        this.count = 0;
        this.subscribers = [];
    }

    addEvent(time, action, state) {
        state = _.cloneDeep(state);
        var event = {
            id: this.count,
            action, state
        };

        this.timeline[time] = event;
        this.subscribers.forEach(cb => {
            cb(event, this);
        });

        this.count++;
    }

    clearSubscriptions() {
        this.subscribers = [];
    }

    subscribe(handler) {
        this.subscribers.push(handler);
    }

    retrieveEvents() {
        return this.timeline;
    }

    clearHistory() {
        this.timeline = {};
    }


}

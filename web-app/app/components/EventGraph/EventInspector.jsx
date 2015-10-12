import React from "react";

export class EventInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.event === undefined) {
            return (<div></div>);
        }

        const INSPECTOR_MAP = {
            "SwitchAddedMessage": <SwitchAddedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />
        };

        if (INSPECTOR_MAP[this.props.event.type] !== undefined) {
            return INSPECTOR_MAP[this.props.event.type];
        }

        return (<div>No mapping found for event type</div>);
    }
}

class SwitchAddedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.props.event}
                <button onClick={this.props.onJumpToState}>Jump to State</button>
            </div>
        );
    }
}

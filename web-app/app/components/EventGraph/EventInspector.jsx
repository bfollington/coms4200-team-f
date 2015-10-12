import React from "react";

import "components/EventGraph/eventInspector.scss";
import {Paper, RaisedButton} from "material-ui";

export class EventInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.event === undefined) {
            return (<div></div>);
        }

        const INSPECTOR_MAP = {
            "SwitchAddedMessage": <SwitchAddedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "SwitchRemovedMessage": <SwitchRemovedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "HostAddedMessage": <HostAddedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "HostRemovedMessage": <HostRemovedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "LinkAddedMessage": <LinkAddedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "LinkRemovedMessage": <LinkRemovedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "HostLinkAddedMessage": <HostLinkAddedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />,
            "HostLinkRemovedMessage": <HostLinkRemovedInspector onJumpToState={this.props.onJumpToState} event={this.props.event} />
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
            <Paper zDepth={2} className="inspector">
                <h3>Switch Added</h3>
                <p><strong>MAC:</strong> {this.props.event.data.id}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class SwitchRemovedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Switch Removed</h3>
                <p><strong>MAC:</strong> {this.props.event.data.id}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class HostAddedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host Added</h3>
                <p><strong>MAC:</strong> {this.props.event.data.id}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class HostRemovedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host Removed</h3>
                <p><strong>MAC:</strong> {this.props.event.data.id}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class LinkAddedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Link Added</h3>
                <p><strong>From:</strong> {this.props.event.data.start}</p>
                <p><strong>On Port:</strong> {this.props.event.data.start_port}</p>
                <p><strong>To:</strong> {this.props.event.data.end}</p>
                <p><strong>On Port:</strong> {this.props.event.data.end_port}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class LinkRemovedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Link Removed</h3>
                <p><strong>From:</strong> {this.props.event.data.start}</p>
                <p><strong>On Port:</strong> {this.props.event.data.start_port}</p>
                <p><strong>To:</strong> {this.props.event.data.end}</p>
                <p><strong>On Port:</strong> {this.props.event.data.end_port}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class HostLinkAddedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host Link Added</h3>
                <p><strong>Host:</strong> {this.props.event.data.host}</p>
                <p><strong>Switch:</strong> {this.props.event.data.switch}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

class HostLinkRemovedInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host Link Removed</h3>
                <p><strong>Host:</strong> {this.props.event.data.host}</p>
                <p><strong>Switch:</strong> {this.props.event.data.switch}</p>
                <p><strong>Time:</strong> {this.props.event.time}</p>
                <RaisedButton label="Jump to State" onClick={this.props.onJumpToState} primary={true} />
            </Paper>
        );
    }
}

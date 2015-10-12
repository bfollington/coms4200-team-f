import React from "react";
import {Paper} from "material-ui";

import {connect} from "react-redux";

export class HostLinkInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.hostLink) {
            return (
                <Paper zDepth={2} className="inspector">
                    <h3>Host Link Has No Info</h3>
                </Paper>
            );
        }

        // var tx_bytes = this.props.switch.ports.reduce((prev, current) => prev + current.data.tx_bytes, 0);

        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host Link</h3>
                <p><strong>Host:</strong> {this.props.hostLink.host}</p>
                <p><strong>Switch:</strong> {this.props.hostLink._switch}</p>
            </Paper>
        );
    }
}

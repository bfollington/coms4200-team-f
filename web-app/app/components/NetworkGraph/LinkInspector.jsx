import React from "react";
import {Paper} from "material-ui";

import {connect} from "react-redux";

export class LinkInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.link) {
            return (
                <Paper zDepth={2} className="inspector">
                    <h3>Link Has No Info</h3>
                </Paper>
            );
        }

        // var tx_bytes = this.props.switch.ports.reduce((prev, current) => prev + current.data.tx_bytes, 0);

        return (
            <Paper zDepth={2} className="inspector">
                <h3>Link</h3>
                <p><strong>From:</strong> {this.props.link.from}</p>
                <p><strong>From Port:</strong> {this.props.link.from_port}</p>
                <p><strong>To:</strong> {this.props.link.to}</p>
                <p><strong>To Port:</strong> {this.props.link.to_port}</p>
                <p><strong>Total Bytes:</strong> {this.props.link.stats.total_bytes}</p>
                <p><strong>Total Packets:</strong> {this.props.link.stats.total_packets}</p>
                <p><strong>Byte Rate:</strong> {this.props.link.stats.byte_rate}</p>
                <p><strong>Packet Rate:</strong> {this.props.link.stats.packet_rate}</p>
            </Paper>
        );
    }
}

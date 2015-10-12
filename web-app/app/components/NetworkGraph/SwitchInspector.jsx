import React from "react";
import {Paper} from "material-ui";

import {connect} from "react-redux";

export class SwitchInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        if (!this.props.switch || !this.props.switch.ports.length) {
            return (
                <Paper zDepth={2} className="inspector">
                    <h3>Switch Has No Info</h3>
                </Paper>
            );
        }

        var tx_bytes = this.props.switch.ports.reduce((prev, current) => prev + current.data.tx_bytes, 0);
        var rx_bytes = this.props.switch.ports.reduce((prev, current) => prev + current.data.rx_bytes, 0);

        var tx_packets = this.props.switch.ports.reduce((prev, current) => prev + current.data.tx_packets, 0);
        var rx_packets = this.props.switch.ports.reduce((prev, current) => prev + current.data.rx_packets, 0);

        return (
            <Paper zDepth={2} className="inspector">
                <h3>Switch</h3>
                <p><strong>TX Bytes:</strong> {tx_bytes}</p>
                <p><strong>RX Bytes:</strong> {rx_bytes}</p>
                <p><strong>Total Bytes:</strong> {tx_bytes + rx_bytes}</p>
                <p><strong>TX Packets:</strong> {tx_packets}</p>
                <p><strong>RX Packets:</strong> {rx_packets}</p>
                <p><strong>Total Packets:</strong> {tx_packets + rx_packets}</p>
                <p><strong>Ports in Use:</strong> {this.props.switch.ports.length}</p>
            </Paper>
        );
    }
}

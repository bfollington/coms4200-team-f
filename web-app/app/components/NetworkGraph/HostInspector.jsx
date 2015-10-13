import React from "react";
import {Paper} from "material-ui";

import {connect} from "react-redux";

export class HostInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper zDepth={2} className="inspector">
                <h3>Host</h3>
                <p><strong>MAC:</strong> {this.props.host}</p>
            </Paper>
        );
    }
}

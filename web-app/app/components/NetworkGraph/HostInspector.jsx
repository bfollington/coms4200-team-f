import React from "react";

export class HostInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>{this.props.node}</div>);
    }
}

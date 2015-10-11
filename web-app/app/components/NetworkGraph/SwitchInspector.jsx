import React from "react";

export class SwitchInspector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>{this.props.node}</div>);
    }
}

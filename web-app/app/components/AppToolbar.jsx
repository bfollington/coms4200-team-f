import React from "react";

import {Toolbar, ToolbarGroup, ToolbarTitle, FontIcon, Toggle, ToolbarSeparator, RaisedButton} from "material-ui";
import { returnToNormal } from "actions/TimeTravel";
import { clearNetwork } from "actions/ClearNetwork";
import { toggleLiveUpdate } from "actions/LiveUpdate";

import {connect} from "react-redux";

@connect(
  state => ({
    liveUpdate: state.App.liveUpdate,
    isTimeTravelling: state.App.isTimeTravelling
  }),
  dispatch => (
    {
      "onClearData": () => dispatch(clearNetwork()),
      "onToggleLiveUpdate": () => dispatch(toggleLiveUpdate()),
      "onReturnToLatestState": () => dispatch(returnToNormal())
    }
  )
)
export default class AppToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Toolbar>
                <ToolbarTitle text="Options" />
                <RaisedButton label="Clear Data" onClick={this.props.onClearData} primary={true} />
                {this.props.isTimeTravelling ? <RaisedButton style={{marginLeft: 24}} label="Return to Current Time" onClick={this.props.onReturnToLatestState} primary={true} /> : null}
                <ToolbarSeparator/>
                <div style={{marginLeft: 24, width: 256, display: "inline-block"}}>
                  <Toggle
                    label="Enable Live Update"
                    checked={this.props.liveUpdate} onToggle={this.props.onToggleLiveUpdate}
                    />
                </div>
            </Toolbar>
        );
    }
}

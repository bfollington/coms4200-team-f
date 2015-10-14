import React from "react";

import {Toolbar, TextField, ToolbarGroup, ToolbarTitle, FontIcon, Toggle, ToolbarSeparator, RaisedButton} from "material-ui";
import { returnToNormal } from "actions/TimeTravel";
import { clearNetwork } from "actions/ClearNetwork";
import { toggleLiveUpdate } from "actions/LiveUpdate";
import { showActionLog } from "actions/App";


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
      "onReturnToLatestState": () => dispatch(returnToNormal()),
      "onShowActionLog": () => dispatch(showActionLog())
    }
  )
)
export default class AppToolbar extends React.Component {
    constructor(props) {
        super(props);
    }

    onStreamChange() {
      if (this.props.onStreamChange) {
        this.props.onStreamChange(this.refs.streamName.getValue());
      }
    }

    render() {
        return (
            <div className="toolbar">
                <ToolbarTitle text="Options" />
                <RaisedButton label="Clear Data" onClick={this.props.onClearData} primary={true} />
                <RaisedButton style={{marginLeft: 24}} label="View Event Log" onClick={this.props.onShowActionLog} primary={true} />
                {this.props.isTimeTravelling ? <RaisedButton style={{marginLeft: 24}} label="Return to Current Time" onClick={this.props.onReturnToLatestState} primary={true} /> : null}
                <ToolbarSeparator/>
                <div style={{marginLeft: 24, width: 256, display: "inline-block"}}>
                  <Toggle
                    label="Enable Live Update"
                    checked={this.props.liveUpdate} onToggle={this.props.onToggleLiveUpdate}
                    />
                </div>
                <TextField
                  hintText="Stream Name"
                  ref="streamName"
                  floatingLabelText="Stream Name"
                  defaultValue="pox" />
                <RaisedButton style={{marginLeft: 24}} label="Change Stream" onClick={this.onStreamChange.bind(this)} primary={true} />
            </div>
        );
    }
}

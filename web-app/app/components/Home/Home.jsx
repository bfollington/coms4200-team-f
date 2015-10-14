'use strict';

import Pusher from "pusher-js";
import React from "react";
//import { Row } from "react-bootstrap";

import NetworkGraph from "../NetworkGraph";
import EventGraph from "../EventGraph";

import _ from "lodash";

import AppToolbar from "components/AppToolbar";

import {connect} from "react-redux";

import {Dialog} from "material-ui";

import { hideActionLog } from "actions/App";

@connect(
    state => (
    {
      switches: !state.App.isTimeTravelling ? state.Switch.items : state.App.selectedState.Switch.items,
      hosts: !state.App.isTimeTravelling ? state.Host.items : state.App.selectedState.Host.items,
      hostLinks: !state.App.isTimeTravelling ? state.HostLink.items : state.App.selectedState.HostLink.items,
      links: !state.App.isTimeTravelling ? state.Link.items : state.App.selectedState.Link.items,
      viewEventLog: state.App.viewEventLog,
      events: state.App.eventLog
    }),
    dispatch => ({
      onHideActionLog: () => dispatch(hideActionLog())
    })
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.nodes = null;
    this.edge = null;
  }


  render() {

    return (
      <div className='homePage pageContent'>
        <NetworkGraph ref='networkGraph' switches={this.props.switches} links={this.props.links} hosts={this.props.hosts} hostLinks={this.props.hostLinks} />
        {
          this.props.viewEventLog ? (
            <Dialog title="Dialog With Scrollable Content" onDismiss={this.props.onHideActionLog} openImmediately={true} autoDetectWindowHeight={true} autoScrollBodyContent={true}>
                <div>
                  {_.clone(this.props.events).reverse().map( event => {
                    return <li>{JSON.stringify(event)}</li>;
                  })}
                </div>
            </Dialog>
          ) : null
        }
      </div>
    );
  }
}

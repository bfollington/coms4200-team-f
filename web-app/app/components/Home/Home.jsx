'use strict';

import Pusher from "pusher-js";
import React from "react";
//import { Row } from "react-bootstrap";

import NetworkGraph from "../NetworkGraph";

import _ from "lodash";

import {connect} from "react-redux";

@connect(
  state => (
    {
      switches: state.Switch.items,
      hosts: state.Host.items,
      hostLinks: state.HostLink.items,
      links: state.Link.items,
    }
  )
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
      </div>
    );
  }
}

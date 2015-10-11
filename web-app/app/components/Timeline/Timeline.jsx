'use strict';

import React from "react";

import EventGraph from "../EventGraph";

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
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className='timelinePage pageContent'>
        <EventGraph ref='eventGraph' />
      </div>
    );
  }
}

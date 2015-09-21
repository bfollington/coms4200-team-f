'use strict';

import Pusher from "pusher-js";
import React from "react";

import _ from "lodash";

import {connect} from "react-redux";
import DisplayTable from "components/DisplayTable";

@connect(
  state => (
    {
      switches: state.Switch.items
    }
  )
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

  }

  render() {
    var message = this.state.messages.length ? this.state.messages[0] : 'No messages yet.';

    var rows = [];

    _.keys(this.props.switches).map( s => {
      rows.push([s, this.props.switches[s] ? "True" : "False"]);
    })

    return (
      <div className='homePage pageContent'>
        <h1>Homepage</h1>

        <h2>Switches</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={rows} />

        <h2>Hosts</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={rows} />

        <h2>Switch Links</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={rows} />

        <h2>Host Links</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={rows} />
      </div>
    );
  }
}

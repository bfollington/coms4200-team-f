'use strict';

import Pusher from "pusher-js";
import React from "react";

import _ from "lodash";

import {connect} from "react-redux";
import DisplayTable from "components/DisplayTable";

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

    this.state = {
      messages: []
    };

  }

  render() {
    var message = this.state.messages.length ? this.state.messages[0] : 'No messages yet.';

    var switches = [];
    _.keys(this.props.switches).map( s => {
      switches.push([s, this.props.switches[s] ? "True" : "False"]);
    });

    var hosts = [];
    _.keys(this.props.hosts).map( h => {
      hosts.push([h, this.props.hosts[h] ? "True" : "False"]);
    });

    var hostLinks = [];
    _.keys(this.props.hostLinks).map( h => {
      hostLinks.push([h, this.props.hostLinks[h].host, this.props.hostLinks[h]._switch, this.props.hostLinks[h].isUp ? "True" : "False"]);
    });

    var links = [];
    _.keys(this.props.links).map( id => {
      links.push([id, this.props.links[id].from, this.props.links[id].to, this.props.links[id].isUp ? "True" : "False"]);
    });

    return (
      <div className='homePage pageContent'>
        <h1>Homepage</h1>

        <h2>Switches</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={switches} />

        <h2>Links</h2>
        <DisplayTable headings={["ID", "From", "To", "Online?"]} rows={links} />

        <h2>Hosts</h2>
        <DisplayTable headings={["ID", "Exists?"]} rows={hosts} />

        <h2>Host Links</h2>
        <DisplayTable headings={["ID", "Host", "Switch", "Online?"]} rows={hostLinks} />
      </div>
    );
  }
}

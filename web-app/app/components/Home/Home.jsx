'use strict';

import Pusher from "pusher-js";
import React from "react";
import { Row } from "react-bootstrap";

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

  mapToNodes(devices, type) {
    let nodes = [];
    _.keys(devices).map( id => {
      nodes.push({
        id: id,
        label: id,
        type: type
      });
    });

    return nodes;
  }

  mapToEdges(links, type) {
    let edges = [];
    _.keys(links).map( id => {
      edges.push({
        id: id,
        from: links[id].from,
        to: links[id].to,
        type: type
      });
    });

    return edges;
  }

  componentWillReceiveProps(nextProps) {
    const hostNodes = this.mapToNodes(nextProps.hosts, 'host');
    const switchNodes = this.mapToNodes(nextProps.switches, 'switch');
    const linkEdges = this.mapToEdges(nextProps.links, 'link');
    const hostLinkEdges = this.mapToEdges(nextProps.hostLinks, 'hostLink');

    const nodes = _.merge(hostNodes, switchNodes);
    const edges = _.merge(linkEdges, hostLinkEdges);

    console.log({
      nodes: nodes,
      edges: edges
    });

    // TODO: Pick one of these.. preferably #2 if it can be unfucked

    // Method #2: Just re-draws the canvas with new data.. doesn't look nice but seems to work
    this.refs.networkGraph.network.setData({
      nodes: nodes,
      edges: edges
    });

    // Method #2: Draws nodes nicely but is buggy trying add duplicate ids sometimes (host/switch same ids??)
    /*
    this.refs.networkGraph.nodes.add(nodes);
    this.refs.networkGraph.edges.add(edges);
    */
  }

  render() {
    let nodes = [];

    let edges = [];

    return (
      <div className='homePage pageContent'>
        <NetworkGraph ref='networkGraph' nodes={nodes} edges={edges} />
      </div>
    );
  }
}

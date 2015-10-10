'use strict';

import React from "react";
import vis from "vis";
// import { Button, ButtonToolbar } from "react-bootstrap";

import _ from "lodash";

require('./style');

function mapToNodes(devices, type) {
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

function mapToEdges(links, type) {
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

export default class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.nodes = new vis.DataSet();
    this.edges = new vis.DataSet();

    this.options = {
      height: '600px',
      nodes: {
        shape: 'dot'
      },
      edges: {
        smooth: {
          enabled: true
        },
        scaling: {
          min: 1,
          max: 8
        }
      },
      physics: {
        stabilization: {
          enabled: true,
          fit: true
        },
      }
    };

    this.network = null;
    this.interval = setInterval(this.updateGraph.bind(this), 1000);
  }

  updateGraph() {
    var hostNodes = _.keys(this.props.hosts).map(hostId => ({id: hostId, label: hostId, group: 0}));
    var switchNodes = _.keys(this.props.switches).map(switchId => ({id: switchId, label: switchId, group: 1, value: this.props.switches[switchId].byte_rate}));

    var hostLinks = _.keys(this.props.hostLinks).map(hostLinkId => ({
      id: hostLinkId,
      from: this.props.hostLinks[hostLinkId]._switch,
      to: this.props.hostLinks[hostLinkId].host,
      group: 0
    }));

    var switchLinks = _.keys(this.props.links).map(switchLinkId => ({
      id: switchLinkId,
      from: this.props.links[switchLinkId].from,
      to: this.props.links[switchLinkId].to,
      group: 1,
      value: this.props.links[switchLinkId].stats.byte_rate
    }));

    this.nodes.update(hostNodes);
    this.nodes.update(switchNodes);

    this.edges.update(hostLinks);
    this.edges.update(switchLinks);

    var options = {
      duration: 500,
      easingFunction: "easeInOutQuad"
    };
    this.network.fit({animation:options});
  }

  componentDidMount() {
    const container = this.refs.graph.getDOMNode();
    const graph = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.network = new vis.Network(container, graph, this.options);
  }

  render() {
    return (
      <div>
        <div id="graph" ref="graph"></div>
      </div>
    );
  }
}

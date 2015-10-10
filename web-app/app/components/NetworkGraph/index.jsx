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
    this.networkAnimating = false;
    this.interval = setInterval(this.updateGraph.bind(this), 1000);
  }

  updateGraph() {
    var hostNodes = _.keys(this.props.hosts)
      .filter(hostId => this.props.hosts[hostId] !== null)
      .map(hostId => ({id: hostId, label: hostId, group: 0}));
    var switchNodes = _.keys(this.props.switches)
      .filter(switchId => this.props.switches[switchId] !== null)
      .map(switchId => ({id: switchId, label: switchId, group: 1, value: this.props.switches[switchId].byte_rate}));

    var hostLinks = _.keys(this.props.hostLinks)
      .filter(hostLinkId => this.props.hostLinks[hostLinkId].isUp)
      .map(hostLinkId => ({
        id: hostLinkId,
        from: this.props.hostLinks[hostLinkId]._switch,
        to: this.props.hostLinks[hostLinkId].host,
        group: 0
      }));

    var switchLinks = _.keys(this.props.links)
      .filter(switchLinkId => this.props.links[switchLinkId].isUp)
      .map(switchLinkId => ({
        id: switchLinkId,
        from: this.props.links[switchLinkId].from,
        to: this.props.links[switchLinkId].to,
        group: 1,
        value: this.props.links[switchLinkId].stats.byte_rate
      }));

    var removedHostNodes = _.keys(this.props.hosts).filter(hostId => this.props.hosts[hostId] === null);
    var removedSwitchNodes = _.keys(this.props.switches).filter(switchId => this.props.switches[switchId] === null);
    var removedHostLinks = _.keys(this.props.hostLinks).filter(hostLinkId => !this.props.hostLinks[hostLinkId].isUp);
    var removedSwitchLinks = _.keys(this.props.links).filter(switchLinkId => !this.props.links[switchLinkId].isUp);

    this.nodes.remove(removedHostNodes);
    this.nodes.remove(removedSwitchNodes);

    this.edges.remove(removedHostLinks);
    this.edges.remove(removedSwitchLinks);

    this.nodes.update(hostNodes);
    this.nodes.update(switchNodes);

    this.edges.update(hostLinks);
    this.edges.update(switchLinks);

    if (!this.networkAnimating) {
      var options = {
        duration: 500,
        easingFunction: "easeInOutQuad"
      };
      this.network.fit({animation:options});
      this.networkAnimating = true;
    }
  }

  componentDidMount() {
    const container = this.refs.graph.getDOMNode();
    const graph = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.network = new vis.Network(container, graph, this.options);
    this.network.on('animationFinished', () => { this.networkAnimating = false });
  }

  render() {
    return (
      <div>
        <div id="graph" ref="graph"></div>
      </div>
    );
  }
}

'use strict';

import React from "react";
import vis from "vis";
// import { Button, ButtonToolbar } from "react-bootstrap";

import _ from "lodash";

import {SwitchInspector} from "./SwitchInspector";
import {HostInspector} from "./HostInspector";
import {LinkInspector} from "./LinkInspector";
import {HostLinkInspector} from "./HostLinkInspector";

require('./style');

import {connect} from "react-redux";

import {Toggle} from "material-ui";


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

@connect(
  state => ({
    switches: !state.App.isTimeTravelling ? state.Switch.items : state.App.selectedState.Switch.items,
    hosts: !state.App.isTimeTravelling ? state.Host.items : state.App.selectedState.Host.items,
    hostLinks: !state.App.isTimeTravelling ? state.HostLink.items : state.App.selectedState.HostLink.items,
    links: !state.App.isTimeTravelling ? state.Link.items : state.App.selectedState.Link.items
  })
)
export default class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedNodes: [],
      selectedEdges: []
    };

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
          max: 8,
          label: {
            enabled: false
          }
        }
      },
      groups: {
        "switch": {
          shape: "triangle",
          color: "#FF5722"
        },
        "host": {
          shape: "dot",
          color: "#1976D2"
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

  }

  updateGraph() {
    var hostNodes = _.keys(this.props.hosts)
      .filter(hostId => this.props.hosts[hostId] !== null)
      .map(hostId => ({id: hostId, label: hostId, group: "host"}));
    var switchNodes = _.keys(this.props.switches)
      .filter(switchId => this.props.switches[switchId] !== null)
      .map(switchId => ({id: switchId, label: switchId, group: "switch", value: this.props.switches[switchId].byte_rate}));

    var hostLinks = _.keys(this.props.hostLinks)
      .filter(hostLinkId => this.props.hostLinks[hostLinkId].isUp)
      .map(hostLinkId => ({
        id: hostLinkId,
        from: this.props.hostLinks[hostLinkId]._switch,
        to: this.props.hostLinks[hostLinkId].host,
        group: "hostLink"
      }));

    var switchLinks = _.keys(this.props.links)
      .filter(switchLinkId => this.props.links[switchLinkId].isUp)
      .map(switchLinkId => ({
        id: switchLinkId,
        from: this.props.links[switchLinkId].from,
        to: this.props.links[switchLinkId].to,
        group: "switchLink",
        value: this.props.links[switchLinkId].stats.byte_rate,
        label: Math.round(this.props.links[switchLinkId].stats.byte_rate / 1024, 2) + "kbps"
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

    if (hostNodes.length == 0 && switchNodes.length == 0 && hostLinks.length == 0 && switchLinks.length == 0) {
      this.nodes.clear();
      this.edges.clear();
    }

    this.fitNetwork();

    // Force update nicely
    this.setState({
      selectedNodes: this.state.selectedNodes,
      selectedEdges: this.state.selectedEdges
    })
  }

  fitNetwork() {
    if (!this.networkAnimating) {
      var options = {
        duration: 500,
        easingFunction: "easeInOutQuad"
      };
      this.network.fit({animation:options});
      this.networkAnimating = true;
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSelect(e) {
    console.log(e);
    this.setState({
      selectedNodes: e.nodes.map(nodeId => this.nodes.get(nodeId)),
      selectedEdges: e.edges.map(edgeId => this.edges.get(edgeId))
    })
  }

  componentDidMount() {
    const container = this.refs.graph.getDOMNode();

    this.nodes = new vis.DataSet();
    this.edges = new vis.DataSet();


    const graph = {
      nodes: this.nodes,
      edges: this.edges
    };

    this.network = new vis.Network(container, graph, this.options);
    this.network.on('animationFinished', () => { this.networkAnimating = false });
    this.network.on("select", this.onSelect.bind(this));

    this.interval = setInterval(this.updateGraph.bind(this), 1000);
    this.updateGraph();
  }

  render() {
    return (
      <div>
        <div id="graph" ref="graph"></div>
        <div>
          {this.state.selectedNodes.map(node => {
              switch(node.group) {
                case "host":
                  return <HostInspector host={this.props.hosts[node.id]} />
                case "switch":
                  return <SwitchInspector switch={this.props.switches[node.id]} />
              }
          })}
          {this.state.selectedNodes.length === 0 ? this.state.selectedEdges.map(edge => {
              switch(edge.group) {
                case "switchLink":
                  return <LinkInspector link={this.props.links[edge.id]} />
                case "hostLink":
                  return <HostLinkInspector hostLink={this.props.hostLinks[edge.id]} />
              }
          }) : null}
        </div>
      </div>
    );
  }
}

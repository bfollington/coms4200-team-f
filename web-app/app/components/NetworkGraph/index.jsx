'use strict';

import React from "react";
import vis from "vis";
import { Button, ButtonToolbar } from "react-bootstrap";

import _ from "lodash";

require('./style');

export default class NetworkGraph extends React.Component {
  constructor(props) {
    super(props);
    this.nodes = new vis.DataSet(props.nodes);
    this.edges = new vis.DataSet(props.edges);

    this.options = {
      height: '600px',
      layout: {
        hierarchical: true
      }
    };

    this.network = null;
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

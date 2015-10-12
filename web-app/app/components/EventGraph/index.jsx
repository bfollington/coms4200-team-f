'use strict';

import React from "react";
import vis from "vis";

import _ from "lodash";

import {EventInspector} from "./EventInspector";

require('./style');
require('vis/dist/vis.css');

import {connect} from "react-redux";
import { jumpToState } from "actions/TimeTravel";

function mapEventToTimelineEntry(event) {
  return {
    id: event.id,
    content: event.action.type,
    start: new Date(event.action.time),
    type: "point",
    full_event: event
  };
}

@connect(
  state => ({}),
  dispatch => ({
    "onJumpToState": (state) => dispatch(jumpToState(state))
  })
)
export default class EventGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.options = {
      maxHeight: '500px'
    };

    this.timeline = null;
  }

  onHistory(event, history) {
    this.events.update(mapEventToTimelineEntry(event));

    this.fitTimeline();
  }

  fitTimeline(duration = 500) {
    this.timeline.fit({
      animation: {
        duration: duration,
        easingFunction: "easeInOutQuad"
      }
    });
  }

  onNodeSelect(e) {
    if (e.items.length > 0) {
      console.log(this.events.get(e.items[0]));
      this.setState({
        selectedAction: this.events.get(e.items[0]).full_event.action,
        selectedState: this.events.get(e.items[0]).full_event.state
      });
    } else {
      this.setState({
        selectedAction: undefined,
        selectedState: undefined
      });
    }
  }

  componentWillUnmount() {
    window.eventHistory.clearSubscriptions();
  }

  componentDidMount() {
    const container = this.refs.timeline.getDOMNode();

    this.events = new vis.DataSet();
    var timeline = window.eventHistory.retrieveEvents();

    this.timeline = new vis.Timeline(container, this.events, this.options);
    this.timeline.on("select", this.onNodeSelect.bind(this));

    this.events.update(_.keys(timeline).map(time => mapEventToTimelineEntry(timeline[time])));
    window.eventHistory.subscribe(this.onHistory.bind(this));

    this.fitTimeline(10);
  }

  onJumpToState() {
    this.props.onJumpToState(this.state.selectedState);
  }

  render() {
    return (
      <div>
        <div id="timeline" ref="timeline"></div>
        <div><EventInspector onJumpToState={this.onJumpToState.bind(this)} event={this.state.selectedAction} /></div>
      </div>
    );
  }
}

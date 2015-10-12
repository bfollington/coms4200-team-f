'use strict';

import React from "react";

import EventGraph from "../EventGraph";

import _ from "lodash";

import { returnToNormal } from "actions/TimeTravel";
import {connect} from "react-redux";

@connect(
  state => ({
    timeTravelling: state.App.isTimeTravelling
  }),
  dispatch => ({
    onReturnToLatestState: () => dispatch(returnToNormal())
  })
)
export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    return (
      <div className='timelinePage pageContent'>
        {this.props.timeTravelling ? <button onClick={this.props.onReturnToLatestState}>Return to Latest State</button> : null}
        <EventGraph ref='eventGraph' />
      </div>
    );
  }
}

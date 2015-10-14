'use strict';

import React from "react";

import EventGraph from "../EventGraph";

import _ from "lodash";

import {connect} from "react-redux";

import AppToolbar from "components/AppToolbar";

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
        <EventGraph ref='eventGraph' />
      </div>
    );
  }
}

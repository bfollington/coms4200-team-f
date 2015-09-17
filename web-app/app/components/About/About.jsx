'use strict';

import React from "react";
import {Paper} from "material-ui";

import "./style";

export default class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='aboutPage pageContent'>
        <h1>About page</h1>
        <h3>You need some..</h3>
        <Paper zDepth={2}>
          <img className='image' src={require('./coffee.jpg')} />
        </Paper>
      </div>
    );
  }
}

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
        <h1>COMS4200</h1>
        <h3>Group F</h3>
        <ul>
          <li>Ben Follington</li>
          <li>Victor Roussekov</li>
          <li>Nic Coates</li>
          <li>Toan Ho</li>
        </ul>
      </div>
    );
  }
}

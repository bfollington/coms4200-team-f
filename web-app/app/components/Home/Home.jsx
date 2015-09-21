'use strict';

import Pusher from "pusher-js";
import React from "react";

import {connect} from "react-redux";

@connect(
  state => (
    {
      switches: state.Switch.items
    }
  )
)
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

  }

  render() {
    var message = this.state.messages.length ? this.state.messages[0] : 'No messages yet.';

    return (
      <div className='homePage pageContent'>
        <h1>Homepage</h1>
        <ul>
          {
            this.state.messages.map( message => {
              return <li>{message.type}, at {message.time} with {message.data}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

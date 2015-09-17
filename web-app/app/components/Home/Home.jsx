'use strict';

import Pusher from "pusher-js";
import React from "react";

// From python backend
import messageData from "../../../../messages.json";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };

  }

  componentWillMount() {
    console.log('init..');
    this.pusher = new Pusher('b0c3071307e884cae9db');
    this.pox = this.pusher.subscribe('pox');
  }

  componentDidMount() {
    console.log('binding..', messageData.messages);

    for (var i = 0; i < messageData.messages.length; i++) {
      this.pox.bind (messageData.messages[i], message => {
        this.setState({
          messages: this.state.messages.concat(message)
        });
      });
    }

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

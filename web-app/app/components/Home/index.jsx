'use strict';

var React        = require('react'),
    mui          = require('material-ui');
    Pusher       = require('pusher-js');

module.exports = React.createClass({

  getInitialState: function() {
    return {
      messages: []
    };
  },

  componentWillMount: function() {
    console.log('init..');
    this.pusher = new Pusher('b0c3071307e884cae9db');
    this.pox = this.pusher.subscribe('pox');
  },

  componentDidMount: function() {
    console.log('binding..');
    this.pox.bind ('packet_flood', function(message) {
      console.log(message);
      this.setState({ messages: this.state.messages.concat(message) })
    }, this);
  },

  render: function() {
    var message = this.state.messages.length ? this.state.messages[0] : 'No messages yet.';

    return <div className='homePage pageContent'>
      <h1>Homepage</h1>
      <p>{message}</p>
    </div>;
  }
});

'use strict';

import React from "react";
import { Provider } from 'react-redux';
import Layout from "./Layout";


import mui from "material-ui";
var ThemeManager = new mui.Styles.ThemeManager();

import "./style";
// require('../../styles/stylesheets/_bootstrap');

import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import Switch from "reducers/Switch";
import Host from "reducers/Host";
import HostLink from "reducers/HostLink";
import Link from "reducers/Link";
import App from "reducers/App";

// From python backend
import messageData from "../../../../messages.json";
import PusherDispatcher from "PusherDispatcher";

// const finalCreateStore = compose(
//     devTools()
// )(createStore);

const finalCreateStore = createStore;

import { clearNetwork } from "actions/ClearNetwork";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.store = finalCreateStore(combineReducers({
      Switch,
      HostLink,
      Link,
      App,
      Host
    }));

    console.log(this.store);

    this.initPusher("pox");
  }

  changeStream(stream) {
    this.pusherDispatcher.tearDown();
    this.store.dispatch(clearNetwork());
    this.initPusher(stream);
  }

  initPusher(stream) {
    this.pusherDispatcher = new PusherDispatcher('b0c3071307e884cae9db', stream, this.store);
    this.pusherDispatcher.subscribeToMessages(messageData.messages);
  }

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  };

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

  onStreamChange(stream) {
    this.changeStream(stream);
  }

  render() {
    return (
      <div>
        <Provider store={this.store}>
        {
          () => {
            return (
              <Layout onStreamChange={this.onStreamChange.bind(this)} />
            );
          }
        }
        </Provider>
        {/*<DebugPanel top right bottom>
          <DevTools store={this.store} monitor={LogMonitor} />
        </DebugPanel>*/}
      </div>

    );
  }
}

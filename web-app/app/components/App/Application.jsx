'use strict';

import React from "react";
import { Provider } from 'react-redux';

import {RouteHandler} from "react-router";
import mui from "material-ui";
var ThemeManager = new mui.Styles.ThemeManager();

import TopNav from "../TopNav";
import SideNav from "../SideNav";

import "./style";

import { createStore, combineReducers, compose } from 'redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import Switch from "reducers/Switch";
import Host from "reducers/Host";
import HostLink from "reducers/HostLink";
import Link from "reducers/Link";

// From python backend
import messageData from "../../../../messages.json";
import PusherDispatcher from "PusherDispatcher";

const finalCreateStore = compose(
    devTools()
)(createStore);

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.store = finalCreateStore(combineReducers({
      Switch,
      HostLink,
      Link,
      Host
    }));

    console.log(this.store);

    this.pusherDispatcher = new PusherDispatcher('b0c3071307e884cae9db', "pox", this.store.dispatch);
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

  onMenuIconButtonTouch() {
    this.refs.sideNav.toggle();
  }


  render() {
    return (
      <div>
        <Provider store={this.store}>
        {
          () => {
            return (
              <div className={'application'}>
                <TopNav onMenuIconButtonTouch={this.onMenuIconButtonTouch.bind(this)}/>
                <SideNav ref='sideNav' />
                <RouteHandler />
              </div>
            );
          }
        }
        </Provider>
        <DebugPanel top right bottom>
          <DevTools store={this.store} monitor={LogMonitor} />
        </DebugPanel>
      </div>

    );
  }
}

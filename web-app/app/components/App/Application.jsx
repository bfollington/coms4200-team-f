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
import Switch from "reducers/Switch";

// From python backend
import messageData from "../../../../messages.json";
import PusherDispatcher from "PusherDispatcher";

export default class Application extends React.Component {
  constructor(props) {
    super(props);

    this.store = createStore(combineReducers({
      Switch
    }));

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

    );
  }
}

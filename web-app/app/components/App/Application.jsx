'use strict';

import React from "react";
import {RouteHandler} from "react-router";
import mui from "material-ui";
var ThemeManager = new mui.Styles.ThemeManager();

import TopNav from "../TopNav";
import SideNav from "../SideNav";

import "./style";

export default class Application extends React.Component {
  constructor(props) {
    super(props);
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
      <div className={'application'}>
        <TopNav onMenuIconButtonTouch={this.onMenuIconButtonTouch.bind(this)}/>
        <SideNav ref='sideNav' />
        <RouteHandler />
      </div>
    );
  }
}

'use strict';

import React from "react";
import {Paper, IconButton, FontIcon, AppBar} from "material-ui";

require('../../../node_modules/material-design-icons/sprites/css-sprite/sprite-navigation-white.css');
require('./style');

export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var menuButton = <IconButton onClick={this.props.onMenuIconButtonTouch}>
      <FontIcon className='menu-icon icon-navigation-white icon-navigation-white-ic_menu_white_24dp' />
    </IconButton>;

    return (
      <Paper className='topNav' rounded={false}>
        <AppBar
          iconElementLeft={menuButton}
          title='COMS4200 PoxVis'
          zDepth={0}>
        </AppBar>
      </Paper>
    );
  }
}

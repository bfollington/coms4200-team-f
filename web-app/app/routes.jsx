'use strict';

import React from "react";
import {Route, DefaultRoute} from "react-router";

import Application from "./components/App/Application";
import About from "./components/About/About";
import Home from "./components/Home/Home";
import Timeline from "./components/Timeline/Timeline";

// polyfill
if (!Object.assign) {
  Object.assign = React.__spread;
}

// export routes
module.exports = (
  <Route name='app' path='/' handler={Application}>
    <Route name='about' handler={About} />
    <Route name='timeline' handler={Timeline} />
    <DefaultRoute handler={Home} />
  </Route>
);

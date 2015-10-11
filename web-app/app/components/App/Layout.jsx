import React from "react";
import {RouteHandler} from "react-router";

import TopNav from "../TopNav";
import SideNav from "../SideNav";

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
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

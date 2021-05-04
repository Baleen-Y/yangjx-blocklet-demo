/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, { PureComponent } from "react";
import "./Header.css";

export default class Header extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <header className="component-header">
                {this.props.type} Search
            </header>
        );
    }
}

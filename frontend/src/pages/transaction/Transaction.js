/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import Header from "../../compoent/Header";
import SearchInput from "../../compoent/SearchInput";
import "./Transaction.css";

export default class Transaction extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hash: ''
        };
    }

    handleSearchChange = event => {
        this.setState({
            hash: event.target.value
        });
    };

    render() {
        return (
            <div>
                <Header type={'Transaction'}/>
                <SearchInput textChange={this.handleSearchChange}/>
                {this.state.hash}
            </div>
        );
    }
}
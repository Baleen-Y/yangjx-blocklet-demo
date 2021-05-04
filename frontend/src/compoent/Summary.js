/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import "./Summary.css";
import moment from "moment";

export default class Summary extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        let summary;
        if (this.props.type === 'Block') {
            summary = 'This block was mined on ' + moment(this.props.info.time*1000).format('MMMM Do YYYY, h:mm:ss a') + ' GMT+8. ';
        }

        if (this.props.type === 'Address') {
            summary = 'This address has transacted ' + this.props.info.n_tx + ' times on the Bitcoin blockchain.'
        }

        if (this.props.type === 'Transaction') {
            summary = 'This transaction was first broadcast to the Bitcoin network on ' + moment(this.props.info.time*1000).format('MMMM Do YYYY, h:mm:ss a') + ' GMT+8. ';
        }
        return (
            <div className="component-summary">
                <h2>{this.props.type} {this.props.type === 'Block' ? this.props.info.height : 'Summary'}</h2>
                <p>{summary}</p>
            </div>
        );
    }
}
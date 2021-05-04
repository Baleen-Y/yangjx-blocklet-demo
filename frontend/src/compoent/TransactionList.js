/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */

'use strict';

import React, {PureComponent} from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TransactionRow from "./TransactionRow";
import Api from "../common/Api";
export default class TransactionList extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="component-tx-list">
                <h2>{this.props.type} Transaction</h2>
                <List component="nav" aria-label="secondary mailbox folders">
                    {
                        this.props.txs.map((tx, key)=> (
                            <TransactionRow key={key} tx={tx}/>
                        ))
                    }
                </List>
            </div>
        );
    }
}
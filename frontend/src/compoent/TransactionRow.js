/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */

'use strict';

import React, {PureComponent} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Box, Link} from "@material-ui/core";
import moment from "moment";
import "./TransactionRow.css";
import {create, all} from "mathjs";

const math = create(all, {});
export default class TransactionRow extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            inputs: this.props.tx.inputs.slice(0, 3),
            out: this.props.tx.out.slice(0, 3),
            inputMore: !(this.props.tx.inputs.length > 3),
            outMore: !(this.props.tx.out.length > 3)
        };
        this.handleInputViewMore = this.handleInputViewMore.bind(this);
        this.handleOutViewMore = this.handleOutViewMore.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            inputs: nextProps.tx.inputs.slice(0, 3),
            out: nextProps.tx.out.slice(0, 3),
            inputMore: !(nextProps.tx.inputs.length > 3),
            outMore: !(nextProps.tx.out.length > 3)
        });
    }

    handleInputViewMore() {
        this.setState({
            inputs: this.props.tx.inputs,
            inputMore: true
        })
    }

    handleOutViewMore() {
        this.setState({
            out: this.props.tx.out,
            outMore: true
        })
    }

    render() {
        let amount = 0;
        this.props.tx.out.forEach(x => {
            amount += x.value;
        });
        return (
            <ListItem className="component-tx-row">
                <Box display="flex" flexDirection="column" className="text-wrap" borderBottom={1}>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>Hash</Box>
                        <Box p={1} className="text-wrap"><a href="javascript:void(0)">{this.props.tx.hash}</a></Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>Date</Box>
                        <Box p={1}>{moment(this.props.tx.time * 1000).format('YYYY-MM-DD hh:mm:ss')}</Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>From</Box>
                        <Box display="flex" flexDirection="column" className="text-wrap">
                            {this.transactionInputs(this.state.inputs)}
                            <Box>
                                <Link hidden={this.state.inputMore}
                                      component="button"
                                      variant="body2"
                                      onClick={this.handleInputViewMore}>
                                    ......view more
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>To</Box>
                        <Box display="flex" flexDirection="column" className="text-wrap">
                            {this.transactionOuts(this.state.out)}
                            <Box>
                                <Link hidden={this.state.outMore}
                                      component="button"
                                      variant="body2"
                                      onClick={this.handleOutViewMore}>
                                    ......view more
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>Fee</Box>
                        <Box
                            p={1}>{math.BigNumber(math.format(this.props.tx.fee / 10000000, {precision: 18})).toFixed(8)} BTC</Box>
                    </Box>
                    <Box display="flex" flexDirection="row" flexWrap="nowrap">
                        <Box p={1} className={'tx-list-name'}>Amount</Box>
                        <Box p={1}>{
                            math.BigNumber(math.format(amount / 10000000, {precision: 18})).toFixed(8)
                        } BTC</Box>
                    </Box>
                </Box>
            </ListItem>
        );
    }

    transactionInputs(txInputs) {

        return txInputs.map((txInput, index) => (
            <Box key={index} display="flex" flexDirection="column" className="text-wrap">
                <Box p={1} hidden={txInput.prev_out}>COINBASE (Newly Generated Coins)</Box>
                <Box p={1} hidden={!txInput.prev_out} className="text-wrap"><a
                    href="javascript:void(0)">{txInput.prev_out ? txInput.prev_out.addr : ''}</a></Box>
                <Box hidden={!txInput.prev_out}
                     p={1}>{txInput.prev_out ? math.BigNumber(math.format(txInput.prev_out.value / 10000000, {precision: 18})).toFixed(8) : ''} BTC</Box>
            </Box>
        ))
    }

    transactionOuts(txOuts) {
        return txOuts.map((txOut, index) => (
            <Box key={index} display="flex" flexDirection="column" className="text-wrap">
                <Box p={1} className="text-wrap"><a href="javascript:void(0)">{txOut.addr}</a></Box>
                <Box p={1}>{math.BigNumber(math.format(txOut.value / 10000000, {precision: 18})).toFixed(8)} BTC</Box>
            </Box>
        ))
    }
}
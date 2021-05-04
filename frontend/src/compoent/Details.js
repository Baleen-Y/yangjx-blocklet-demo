/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";
import "./Details.css";
import Api from "../common/Api";
import {create, all} from "mathjs";

const math = create(all, {});
export default class Details extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            rows: this.createRows(props),
            totalAmount: 0
        }
    }

    async componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            rows: this.createRows(nextProps)
        })
        let totalAmount = 0;
        if (nextProps.type === 'Block') {
            totalAmount = await Api.getTransactionAmount(nextProps.info.height, nextProps.type.toLowerCase())
        }
        this.setState({
            totalAmount: totalAmount
        })
    }

    async componentDidMount() {
        let totalAmount = 0;
        if (this.props.type === 'Block') {
            totalAmount = await Api.getTransactionAmount(this.props.info.height, this.props.type.toLowerCase())
        }
        this.setState({
            totalAmount: totalAmount
        })

    }

    createRows(props) {
        let rows = [];
        if (props.type === 'Block') {
            rows = [
                this.createData('Hash', props.info.hash),
                this.createData('Timestamp', moment(props.info.time * 1000).format('YYYY-MM-DD hh:mm:ss')),
                this.createData('Height', props.info.height),
                this.createData('Number of Transactions', props.info.n_tx),
                this.createData('Merkle root', props.info.mrkl_root),
                this.createData('Version', '0x' + props.info.ver.toString(16)),
                this.createData('Bits', props.info.bits.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")),
                this.createData('Weight', props.info.weight.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + ' WU'),
                this.createData('Size', props.info.size.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,") + ' bytes'),
                this.createData('Nonce', props.info.nonce.toFixed(0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,")),
                this.createData('TotalAmount', '(Transaction Volume+Block Reward)'),
                this.createData('Fee Reward', math.BigNumber(math.format(props.info.fee / 10000000, {precision: 18})).toFixed(8) + ' BTC'),
            ];
        }
        return rows;
    }

    createData(key, value) {
        return {key, value};
    }

    render() {
        return (
            <div className="component-details">
                <h2>Details</h2>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell><span className={'detail-head-text'}>Key</span></TableCell>
                                <TableCell align="left"><span className={'detail-head-text'}>Value</span></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, key) => (
                                <TableRow key={key}>
                                    <TableCell component="th" scope="row">
                                        {row.key}
                                    </TableCell>
                                    <TableCell
                                        align="left">{(row.key === 'TotalAmount') ? (math.BigNumber(math.format(this.state.totalAmount / 10000000, {precision: 18})).toFixed(8).toLocaleString() + ' BTC ' + row.value) : row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}
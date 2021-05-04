/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import "./SearchResult.css";
import Summary from "./Summary";
import Details from "./Details";
import TransactionList from "./TransactionList";
import Pagination from '@material-ui/lab/Pagination';
import {create, all} from "mathjs";
import Api from "../common/Api";
import {LinearProgress} from "@material-ui/core";
const math = create(all, {});
export default class SearchResult extends PureComponent {

    constructor(props) {
        super(props);
        let txs = [];
        if (this.props.type === 'Block') {
            txs = props.info.tx;
        }
        if (this.props.type === 'Address') {
            txs = props.info.txs;
        }
        this.state = {
            txs: txs,
            loading: false
        }
        this.pageChange = this.pageChange.bind(this);
    }

    async pageChange(event, page) {
        this.setState(
            {
                loading: true
            }
        )
        let hash = '';
        if (this.props.type === 'Block') {
            hash = this.props.info.height;
        }
        if (this.props.type === 'Address') {
            hash = this.props.info.address;
        }
        let txs = await Api.getTransactionList(hash, this.props.type.toLowerCase(), page);
        this.setState(
            {
                txs: txs,
                loading: false
            }
        )
    }
    async componentWillReceiveProps(nextProps, nextContext) {
        let txs = [];
        if (nextProps.type === 'Block') {
            txs = nextProps.info.tx;
        }
        if (nextProps.type === 'Address') {
            txs = nextProps.info.txs;
        }
        this.setState(
            {
                txs: txs
            }
        )
    }
    render() {
        return (
            <div className="component-search-result">
                {this.props.info ? <Summary info={this.props.info} type={this.props.type}/> : ''}
                {this.props.info ? <Details info={this.props.info} type={this.props.type}/> : ''}
                <TransactionList txs={this.state.txs} type={this.props.type}/>
                {this.state.loading?<LinearProgress />:''}
                {this.props.info.n_tx > 5 ? <Pagination onChange={this.pageChange} count={math.ceil(this.props.info.n_tx/5)}/> : ''}
            </div>
        );
    }
}
/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import Header from "../../compoent/Header";
import SearchInput from "../../compoent/SearchInput";
import SearchResult from "../../compoent/SearchResult";
import Api from "../../common/Api";
import "./Block.css";
import {LinearProgress} from "@material-ui/core";

export default class Block extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            hash: '',
            block: '',
            loading: false
        };
    }

    componentDidMount() {

    }

    async getBlock(hash) {
        let block = await Api.getSingleBlock(hash);
        this.setState({
            block: block,
            hash: hash,
            loading: false
        });
    }

    handleSearchChange = event => {
        this.setState(
            {
                loading: true
            }
        )
        this.getBlock(event.target.value);
        // this.setState({
        //     hash: event.target.value
        // });
    };

    render() {
        return (
            <div>
                <Header type={'Block'}/>
                <SearchInput textChange={this.handleSearchChange}/>
                {this.state.loading?<LinearProgress />:''}
                {
                    this.state.block ? <SearchResult info={this.state.block} type={'Block'}/> : <p className={'type-description'}>Welcome Block Search</p>
                }
            </div>
        );
    }
}
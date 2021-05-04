/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import "./SearchInput.css";

export default class SearchInput extends PureComponent {
    static propTypes = {
        textChange: PropTypes.func
    };

    handleChange = event => {
        if (event.keyCode === 13) {
            this.props.textChange(event);
        }
    };

    render() {
        return (
            <div className="component-search-input">
                <div>
                    <input onKeyUp={this.handleChange}/>
                </div>
            </div>
        );
    }
}

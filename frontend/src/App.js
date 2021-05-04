import React, {PureComponent} from 'react';
import {NavLink, BrowserRouter as Router} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from './config/router.config';
import "./App.css";
import {Container} from "@material-ui/core";
class App extends PureComponent {
    render() {
        return (
            <Router>
                <div className={'app-header'}>
                    <NavLink className={'navlink'} exact to="/" activeClassName="link-active">Block</NavLink>
                    <NavLink className={'navlink'} to="/addr" activeClassName="link-active">Address</NavLink>
                    <NavLink className={'navlink'} to="/tx" activeClassName="link-active">Transaction</NavLink>
                </div>
                <Container className={'app-body'}>
                    {renderRoutes(routes)}
                </Container>
                <div className={'app-footer'}>App-footer</div>
            </Router>
        )
    }
}

export default App;
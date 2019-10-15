import React, {Component} from 'react';
import Header from "../elements/header";
 
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom';

class NotFound extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div id="wrapper">
                     
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <h1 className="display-1">404</h1>
                            <p className="lead">Page not found. You can go back to the previous page, or&nbsp;<Link to={'/home'}>return home</Link>.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const {string, object} = PropTypes;
NotFound.propTypes = {
    title: string.isRequired,
    history: object
};

export default withRouter(NotFound)

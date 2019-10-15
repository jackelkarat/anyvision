import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, Alert, } from "react-bootstrap";
import TitleComponent from "./title";
import Header from "../elements/header";
require('dotenv').config();

var firstname = sessionStorage.getItem('userFirstname');

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: ""
        };
    }

    validateForm() {
        return   this.state.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const url = {
            userid: sessionStorage.getItem('userId'),
            url: this.state.url,
        }

        console.log(url);

        axios.post('http://localhost:3001/links/addURL', url)
            .then(function (response) {
                console.log(response);
                if (response.data == true) {
                    window.location = '/rtsp';
                } else {
                    this.dataResponse = response.data;
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                    <TitleComponent title="Home "></TitleComponent>
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header">Hi {firstname}, welcome to Home page</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="url" >
                                    <label>Add URL</label>
                                    <FormControl
                                        autoFocus
                                        type="url"
                                        value={this.state.url}
                                        required
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <Button 
                                block disabled={!this.validateForm()}
                                    type="submit">
                                    Add URL
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

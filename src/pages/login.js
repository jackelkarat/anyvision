import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import TitleComponent from "./title";
import Header from "../elements/header";

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';


export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const login = {
            email: this.state.email,
            password: this.state.password
        }

        console.log(login);

        axios.post('http://localhost:3001/users/login', login)
            .then(function (response) {
                console.log(response);
                if (response.status == 200 && !response.data.error) {
                    sessionStorage.setItem('IsAllowed', 'true');
                    sessionStorage.setItem('userId',response.data[0].id);
                    sessionStorage.setItem('userFirstname',response.data[0].firstname);
                    window.location = '/home';
                } else {

                        toast.error(response.data.error);

                }
            })
            .catch(error => {
                console.log(error);
                toast.error(error);

            });
    }

    render() {
        return (
            <div>
                <Header />
                <div className="container">
                <ToastContainer />
                    <TitleComponent title="Login "></TitleComponent>
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                                <FormGroup controlId="email" >
                                    <label>Email</label>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" >
                                    <label>Password</label>
                                    <FormControl
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                        type="password"
                                    />
                                </FormGroup>
                                <Button 
                                block disabled={!this.validateForm()}
                                    type="submit">
                                    Login
                                </Button>
                            </form>
                            <div className="text-center">
                            <Link className="d-block small mt-3" to={'/register'}>Register Your Account</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

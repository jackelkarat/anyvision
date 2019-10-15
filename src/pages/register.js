import React, { Component } from 'react';
import axios from 'axios';
import {Link, Redirect} from "react-router-dom";
import { Button, FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import TitleComponent from "./title";
import Header from "../elements/header";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            firstname: "",
            lastname:"",
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && 
        this.state.password.length > 0 && 
        this.state.firstname.length > 0 && 
        this.state.lastname.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        event.preventDefault();
        const register = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            password: this.state.password
        }

        console.log(register);

        axios.post('http://localhost:3001/users/register', register)
            .then(function (response) {
                console.log(response);
                if (response.status == 200 && response.data == "success") {
                    window.location = '/';
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
                    <TitleComponent title="Register"></TitleComponent>
                    <div className="card card-login mx-auto mt-5">
                        <div className="card-header">Register</div>
                        <div className="card-body">
                            <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="firstname" >
                                    <label>Firstname</label>
                                    <FormControl
                                    autoFocus
                                        value={this.state.firstname}
                                        onChange={this.handleChange}
                                        type="text"
                                    />
                            </FormGroup>
                            <FormGroup controlId="lastname" >
                                    <label>Lastname</label>
                                    <FormControl
                                        value={this.state.lastname}
                                        onChange={this.handleChange}
                                        type="text"
                                    />
                                </FormGroup>
                                <FormGroup controlId="email" >
                                    <label>Email</label>
                                    <FormControl
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
                                    Register
            </Button>
                            </form>
                            <div className="text-center">
                            <Link className="d-block small mt-3" to={'/'}>Login Your Account</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TitleComponent from "./title";
import Header from "../elements/header";
require('dotenv').config();

const Links = props => (
  <tr>
    <td>{props.link.id}</td>  
    <td>{props.link.link}</td>  
  </tr>
)

export default class Rtsp extends Component {
  constructor(props) {
    super(props);


    this.state = {links: []};
  }

  componentDidMount() {

    const rtsp = {
        userid: '1',
    }

    console.log(rtsp);

    axios.post('http://localhost:3001/links/getlinks', rtsp)
      .then(response => {
        this.setState({ links: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }



  linkList() {
    return this.state.links.map(currentlink => {
      return <Links link={currentlink}  key={currentlink._id}/>;
    })
  }

  render() {
    return (

        <div>
                <Header/>
                <div id="wrapper">
                     
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <div className="card mb-3">
                                <div className="card-header">
                                    RTSP
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-bordered" id="dataTable" width="100%"
                                               cellSpacing="0">
                                            <thead>
                                            <tr>
                                            <th></th>
                                            <th>Links</th>
                                            </tr>
                                            </thead>
                         
                                            <tbody>
                                            { this.linkList() }   
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
    )
  }
}
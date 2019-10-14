import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './assets/vendor/fontawesome-free/css/all.min.css'
import './assets/css/sb-admin.css'

import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Index from "./pages/index";
import AddPage from "./pages/add";
import EditPage from "./pages/edit";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import Home from "./pages/home";
import Rtsp from "./pages/rtsp";


function PrivateRoute ({component: Component, authed, ...rest}) {
    return (
        
      <Route
        {...rest}
        render={(props) => sessionStorage.getItem('IsAllowed') === 'true'
          ? <Component {...props} />
          : <Redirect to={{pathname: '/', state: {from: props.location}}} />}
      />
      
    )
  }
  
class App extends Component {

    
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <PrivateRoute exact  path='/rtsp' component={Rtsp} />
                        <PrivateRoute exact  path='/dashboard' component={Dashboard} />
                        <Route path='/index' component={Index}/>
                        <PrivateRoute exact  path='/home' component={Home} />
                        <Route path='/register' component={Register} />
                        <PrivateRoute exact  path='/add' component={AddPage} />
                        <PrivateRoute exact  path='/edit/' component={EditPage} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;

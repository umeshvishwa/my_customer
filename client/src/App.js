import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Home from './Home/Home';
import Customers from './Customers/Customers';
import Customer from './Customer/Customer';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <SecuredRoute path='/customers' component={Customers} />
        <Route exact path='/customer/:customerId' component={Customer}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default App;
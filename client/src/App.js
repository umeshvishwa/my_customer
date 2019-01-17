import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from 'auth0-js';
import NavBar from './NavBar/NavBar';
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import Home from './Home/Home';
import Customers from './Customers/Customers';
import AddCustomer from './Customer/AddCustomer';
import Customer from './Customer/Customer';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }

  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({checkingSession:false});
      return;
    }
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({checkingSession:false});
  }

  render() {
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Home}/>
        <SecuredRoute path='/customers' component={Customers} checkingSession={this.state.checkingSession}/>
        <SecuredRoute exact path='/customer/update' component={AddCustomer} checkingSession={this.state.checkingSession}/>
        <SecuredRoute exact path='/customer/add' component={AddCustomer} checkingSession={this.state.checkingSession}/>
        <SecuredRoute exact path='/customer/view' component={Customer} checkingSession={this.state.checkingSession}/>
        <Route exact path='/callback' component={Callback}/>
      </div>
    );
  }
}

export default withRouter(App);
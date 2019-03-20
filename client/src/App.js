import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import auth0Client from 'auth0-js';
import NavBar from './NavBar/NavBar';
import Callback from './Callback';
import SecuredRoute from './SecuredRoute/SecuredRoute';
import SecuredAdminRoute from './SecuredRoute/SecuredAdminRoute';

import AccessDenied from './Custom/AccessDenied';

import Home from './Home/Home';
import Customers from './Customers/Customers';
import AddCustomer from './Customer/AddCustomer';
import Customer from './Customer/Customer';
import AddCustomerFamily from './Customer/AddCustomerFamily';

import AdminDashboard from './Admin/Dashboard';
import ManageBrand from './Admin/ManageBrand';
import ManageCategory from './Admin/ManageCategory';
import ManageProduct from './Admin/ManageProduct';

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
        <SecuredRoute exact path='/customer/family/add' component={AddCustomerFamily} checkingSession={this.state.checkingSession}/>
        
        <SecuredAdminRoute exact path='/admin/dashboard' component={AdminDashboard} checkingSession={this.state.checkingSession}/>
        <SecuredAdminRoute exact path='/admin/brand/manage' component={ManageBrand} checkingSession={this.state.checkingSession}/>
        <SecuredAdminRoute exact path='/admin/category/manage' component={ManageCategory} checkingSession={this.state.checkingSession}/>
        <SecuredAdminRoute exact path='/admin/product/manage' component={ManageProduct} checkingSession={this.state.checkingSession}/>

        <Route exact path='/callback' component={Callback}/>
        <Route exact path='/error/403' component={AccessDenied}/>
      </div>
    );
  }
}

export default withRouter(App);
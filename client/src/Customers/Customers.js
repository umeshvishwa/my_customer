import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
//import auth0Client from '../Auth';
import axios from 'axios';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
    };
  }

  async componentDidMount() {
    const customers = (await axios.get('https://us-central1-my-customer-30842.cloudfunctions.net/getCustomers')).data;
    this.setState({
        customers,
    });
  }

  render() {
    console.log(this.state.customers)
    return (
      <div className="container">
        <div className="row">
          {this.state.customers === null && <p>Loading customers...</p>}
          {
            this.state.customers && this.state.customers.map((customer) => (
              <div key={customer.id} className="col-sm-12 col-md-4 col-lg-3">
                <Link to={`/customer/5c1e19d97dc86cb448a42c15}`}>
                  <div className="card text-white bg-success mb-3">
                    <div className="card-header">Name: {customer.customer.profile.email}</div>
                    <div className="card-body">
                      <h4 className="card-title">{customer.customer.profile.dob}</h4>
                      <p className="card-text">{customer.customer.profile.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Customers);
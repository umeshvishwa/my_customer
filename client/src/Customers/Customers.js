import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import $http from '../Utility/Http';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
    };
  }

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    const customers = (await $http.get("/customer/getAll?user=" + userProfile.sub)).data;
    
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
              <div key={customer._id} className="col-sm-12 col-md-4 col-lg-3">
                
                  <div className="card-info card text-white bg-success mb-3">
                    <div className="card-header">
                      <Link to={`/customer/5c1e19d97dc86cb448a42c15}`} className="link">
                        <i className="fa fa-user"></i>
                        <p className="title-card">{customer.name}</p>
                      </Link>
                    </div>
                    <div className="card-body">
                      <ul>
                        <li>
                          <span className="label-custom">Date of Birth:</span>
                          <p className="value">{customer.birthDate}</p>
                        </li>
                        { customer.email && 
                          <li>
                            <span className="label-custom">Email ID:</span>
                            <p className="value">{customer.email}</p>
                          </li>
                        }
                        <li>
                          <span className="label-custom">Mobile#:</span>
                          <p className="value">{customer.mobile}</p>
                        </li>
                      </ul>
                    </div>
                  </div>                
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export default withRouter(Customers);
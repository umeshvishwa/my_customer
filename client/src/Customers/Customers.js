import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import Loader from 'react-loader-spinner';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
      loading: 0,
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  async componentDidMount() {
    this.getAllCustomers();
  }

  getAllCustomers() {
    let userProfile = auth0Client.getProfile();
    this.increamentLoadingCounter();
    $http.get("/customer/getAll?user=" + userProfile.sub)
    .then(({data}) => {
      this.setState(Object.assign(this.state, {
          customers: data,
      }));
    })
    .catch((reason) => {
      console.error('On Error: ' + reason);
    })
    .finally(() => {
      this.decreamentLoadingCounter();
    }); 
  }

  handleRemove(cid) {
    this.increamentLoadingCounter();
    $http.delete("/customer/delete", {
      params: {id: cid}
    })
    .then((data) => {
      this.getAllCustomers();
    })
    .catch(reason => {
      console.error("Error:" + reason);
    })
    .finally(() => {
      this.decreamentLoadingCounter();
      console.log('Finally');
    });
  }
  increamentLoadingCounter() {
    let loading = this.state.loading + 1;
    this.setState(Object.assign(this.state, {loading: loading}));
    console.log(this.state)
  }
  decreamentLoadingCounter() {
    if(this.state.laoding === 0) return ;
    let loading = this.state.loading - 1;
    this.setState(Object.assign(this.state, {loading: loading}));
    console.log(this.state)
  }
  render() {
    let styleDisplay = (this.state.loading > 0) ? {display: 'block'} : {display: 'none'};
    
    return (
      <div className="container">
        <div className="loader" style={styleDisplay}>
          <Loader width="20" height="20"/>
        </div>
        <div className="row">
          {this.state.customers === null && <p>Loading customers...</p>}
          {this.state.customers && this.state.customers.length === 0 && <p>You have yet not added any customer.</p>}
          {
            this.state.customers && this.state.customers.map((customer) => (
              <div key={customer._id} className="col-sm-12 col-md-4 col-lg-3">
                
                  <div className="card-info card text-white bg-success mb-3">
                    <div className="card-header">
                      <Link to={`/customer/view?` + customer._id} className="link">
                        <i className="fa fa-user"></i>
                        <p className="title-card">{customer.first_name} {customer.last_name}</p>
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
                    <div className="card-footer">
                        <Link className="icon-edit float-left" to={"/customer/update?id="+customer._id}>
                          <i className="fa fa-edit"></i>
                        </Link> 
                        <span className="icon-trash float-right" onClick={() => this.handleRemove(customer._id)}>
                          <i className="fa fa-trash"></i>
                        </span>          
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
import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import Loader from 'react-loader-spinner';
import ConfirmModal from '../Custom/ConfirmModal'
import moment from 'moment';

class Customers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customers: null,
      loading: 0,
      selectedCustomerId: null,
      isModalDisplay: false,
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleModalButton = this.handleModalButton.bind(this);
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

  handleModalButton(isConfirmed) {
    if(isConfirmed) {
      this.handleRemove(this.state.selectedCustomerId);
    } 
    
    //Hide modal window
    this.setStateValue({
      isModalDisplay: false
    });
  }

  showConfirmModal(selectedCustomerId) {
    this.setStateValue({
      isModalDisplay: true,
      selectedCustomerId: selectedCustomerId
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
    });
  }
  increamentLoadingCounter() {
    let loading = this.state.loading + 1;
    this.setState(Object.assign(this.state, {loading: loading}));
  }
  decreamentLoadingCounter() {
    if(this.state.laoding === 0) return ;
    let loading = this.state.loading - 1;
    this.setState(Object.assign(this.state, {loading: loading}));
  }

  /**
   * Method to set value in state
   */
  setStateValue(obj) {
    this.setState(Object.assign(this.state, obj));
  }

  render() {
    let styleDisplay = (this.state.loading > 0) ? {display: 'block'} : {display: 'none'};
    let userProfile = auth0Client.getProfile();
    return (
      <div className="container">
        <div className="loader" style={styleDisplay}>
          <Loader width="20" height="20"/>
        </div>
        
        <ConfirmModal show={this.state.isModalDisplay}
          title="Are you sure? "
          body="Customer will be removed parmanently. Do you still want to remove this customer?"
          actionButton="Yes"
          closeButton="No" 
          onButtonClick={this.handleModalButton} 
        />

        <div className="row">
          {this.state.customers === null && <p>Loading customers...</p>}
          {this.state.customers && this.state.customers.length === 0 && <p>You have yet not added any customer.</p>}
          {
            this.state.customers && this.state.customers.map((customer) => (
              <div key={customer._id} className="col-sm-12 col-md-4 col-lg-3">
                
                  <div className="card-info card text-white bg-success mb-3">
                    <div className="card-header">
                      <Link to={`/customer/view?id=` + customer._id+`&user=` + userProfile.sub} className="link">
                        <i className="fa fa-user"></i>
                        <p className="title-card">{customer.first_name} {customer.last_name}</p>
                      </Link>
                    </div>
                    <div className="card-body">
                      <ul>
                        { customer.birthDate && 
                          <li>
                            <span className="label-custom">Date of Birth:</span>
                            <span className="value">
                              {moment(customer.birthDate, 'YYYY-MM-DD').format('DD MMM YYYY')}
                            </span>
                          </li>
                        }
                        { customer.anniversaryDate && 
                          <li>
                            <span className="label-custom">Date of Birth:</span>
                            <span className="value">
                              {moment(customer.anniversaryDate, 'YYYY-MM-DD').format('DD MMM YYYY')}
                            </span>
                          </li>
                        }
                      </ul>
                    </div>
                    <div className="card-footer">
                        <Link className="icon-edit float-left" to={"/customer/update?id="+customer._id}>
                          <i className="fa fa-edit"></i>
                        </Link> 
                        <span className="icon-trash float-right" onClick={() => this.showConfirmModal(customer._id)}>
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
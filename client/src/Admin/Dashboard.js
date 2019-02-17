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
        {
          <div className="row">
            <div className="col-xs-12 col-sm-4 col-lg-3 mt-2">
              <Link to="/admin/product/manage/" className="btn btn-primary btn-lg col-12">
                  Manage Product 
              </Link>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-3 mt-2">
              <Link to="/admin/brand/manage/" className="btn btn-primary btn-lg col-12">
                  Manage Brand 
              </Link>
            </div>
            <div className="col-xs-12 col-sm-4 col-lg-3 mt-2">
              <Link to="/admin/category/manage/" className="btn btn-primary btn-lg col-12">
                  Manage Category 
              </Link>
            </div>
          </div>
        }
      </div>
    )
  }
}

export default withRouter(Customers);
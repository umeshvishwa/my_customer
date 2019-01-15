import React, {Component} from 'react';
import auth0Client from '../Auth';
import axios from 'axios';
import $http from '../Utility/Http';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        userId: '',
        first_name: '',
        last_name: '',
        mobile: '',
        email: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postal_code: ''
        },
        is_pc: false,
        pcId: null,
        password: null,
        birthDate: '',
        anniversary: '',
        incomeBracket: '',        
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {console.log(this.props)
    let userProfile = auth0Client.getProfile();
    
    let {customer} = this.state;
    customer["userId"] = userProfile.sub;
    this.setState({ customer })
    console.log(this.state);
    
    $http.post("/customer/add", customer)
    .then((data) => {
      console.log(data);
    })
    .catch(reason => {
      console.error("Error:" + reason);
    })
    .finally(() => {
      console.log('Finally');
    });
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    const namePart = name.split('.');
    let {customer} = this.state;
    if(namePart.length > 1) {
      customer[namePart[0]][namePart[1]] = value;
    } else {
      customer[name] = value;
    }
    this.setState({ customer })
  }
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    $http.post("/customer/add", this.state.customer)
    .then((data) => {
      console.log(data);
    })
    .catch(reason => {
      console.error("Error:" + reason);
    })
    .finally(() => {
      console.log('Finally');
    });
  }
  render() {
    const {customer} = this.state;
    if (customer === null) return <p>Loading ...</p>;
    
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>Add Customer</h2>
          <p className="hint-text">Create your account. It's free and only takes a minute.</p>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>First Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                  name="first_name" placeholder="First Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Last Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="last_name" placeholder="Last Name" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Mobile#:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="mobile" placeholder="Mobile number" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Email ID:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="email" placeholder="Email" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 1:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="address.line1" placeholder="House No./street name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 2:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="address.line2" placeholder="Sector/Locality" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>City:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="address.city" placeholder="City Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>State:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="address.state" placeholder="State" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Postal Code:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                 name="address.postal_code" placeholder="Postal Code" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Birth Date:</label>
                <input type="date" className="form-control" name="birthDate" onChange={this.handleChange} />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Anniversary:</label>
                <input type="date" className="form-control" name="anniversaryDate" onChange={this.handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-lg-12">
                <input type="checkbox" name="is_pc" checked={this.state.customer.is_pc} className="form-control" 
                  onChange={this.handleChange} />
                <label>Is registered as preferred customer?</label>
              </div>
            </div>
            { 
              this.state.customer.is_pc && <div className="row">    
                  <div className="col-12 col-sm-6 col-lg-6">
                    <label>Preferred Customer Id:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} 
                     name="pc_id" placeholder="Preferred Customer ID" required="required"/>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-6">
                    <label>Preferred Customer password:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} 
                     name="pc_password" placeholder="Preferred Customer password" required="required"/>
                  </div>
              </div>
            }
            <div className="row">
              <div className="col-12 col-sm-4 col-lg-4 mt-2">
                <input type="button" name="addCustomer" className="form-control btn btn-primary" onClick={this.handleSubmit} value="Add" />
              </div>
            </div>
            
          </div>
        </form>
      </div>
    )
  }
}

export default AddCustomer;
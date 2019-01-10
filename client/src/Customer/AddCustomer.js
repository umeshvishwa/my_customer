import React, {Component} from 'react';
import auth0Client from '../Auth';
import axios from 'axios';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        userId: '',
        first_name: '',
        last_name: '',
        mobile: '',
        emailId: '',
        address: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postal_code: ''
        },
        is_pc: true,
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
    //const { match: { params } } = this.props;
    //console.log(params);
    //const customer = {};
    axios.get("http://localhost:5000/api/customer/getAll?user=auth0|5c214730c5db266ab30b0215")
    .then((data) => {
      console.log(data);
    });
    //console.log(customer.customer);
    //this.setState({
        //customer: customer.customer
    //});
    
  }
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    
    let {customer} = this.state;
    customer[name] = value;
    this.setState({ customer })
  }
  handleSubmit(event) {
    console.log(this.state);
    axios.post("/customer/getAll", {
      "userId": "auth0|5c214730c5db266ab30b0215"
    })
    .then((data) => {
      console.log(data);
    });
    event.preventDefault();
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
                <input type="text" className="form-control" name="first_name" placeholder="First Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Last Name:</label>
                <input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Mobile#:</label>
                <input type="text" className="form-control" name="mobile" placeholder="Mobile number" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Email ID:</label>
                <input type="text" className="form-control" name="email" placeholder="Email" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 1:</label>
                <input type="text" className="form-control" name="address1" placeholder="House No./street name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 2:</label>
                <input type="text" className="form-control" name="address2" placeholder="Sector/Locality" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>City:</label>
                <input type="text" className="form-control" name="city" placeholder="City Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>State:</label>
                <input type="text" className="form-control" name="State" placeholder="State" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Postal Code:</label>
                <input type="text" className="form-control" name="postal_code" placeholder="Postal Code" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Birth Date:</label>
                <input type="date" className="form-control" name="birthDate" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Anniversary:</label>
                <input type="date" className="form-control" name="anniversaryDate" />
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
                    <input type="text" className="form-control" name="pc_id" placeholder="Preferred Customer ID" required="required"/>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-6">
                    <label>Preferred Customer password:</label>
                    <input type="text" className="form-control" name="pc_password" placeholder="Preferred Customer password" required="required"/>
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
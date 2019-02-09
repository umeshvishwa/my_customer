import React, {Component} from 'react';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import qs from 'query-string';
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
        line1: '',
        line2: '',
        city: '',
        state: '',
        postal_code: '',
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

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    let queryParams = qs.parse(this.props.location.search);
    
    let {customer} = this.state;
    customer["userId"] = userProfile.sub;
    this.setState({ customer })
    
    if(queryParams.id !== undefined) {
      this.loadCustomer(queryParams.id, userProfile.sub);
    }
  }

  loadCustomer(id, user) {
    $http.get("/customer/get", {
      params: { id: id, user: user }
    })
    .then(({data}) => {
      this.setState(Object.assign(this.state, { customer: data }));
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
    let {customer} = this.state;
    customer[name] = value;
    
    this.setState({ customer })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    if(this.state.customer._id === undefined) {
      $http.post("/customer/add", this.state.customer)
      .then(({data}) => {
        if(data._id) {
          this.props.history.push('/customers')
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    } else {
      $http.post("/customer/update", this.state.customer)
      .then(({data}) => {
        if(data) {
          this.props.history.push('/customers')
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    }
  }

  render() {
    const {customer} = this.state;
    let queryParams = qs.parse(this.props.location.search);
    if (customer === null) return <p>Loading ...</p>;

    const pageTitle = (queryParams.id === undefined) ? 'Add Customer' : 'Edit Customer';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <p className="hint-text">Create your customer to record their information.</p>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>First Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.first_name} 
                  name="first_name" placeholder="First Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Last Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.last_name} 
                 name="last_name" placeholder="Last Name" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Mobile#:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.mobile}  
                 name="mobile" placeholder="Mobile number" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Email ID:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.email}  
                 name="email" placeholder="Email" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 1:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.line1} 
                 name="line1" placeholder="House No./street name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Address Line 2:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.line2}
                 name="line2" placeholder="Sector/Locality" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>City:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.city} 
                 name="city" placeholder="City Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>State:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.state} 
                 name="state" placeholder="State" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Postal Code:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.postal_code} 
                 name="postal_code" placeholder="Postal Code" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Birth Date:</label>
                <input type="date" className="form-control" name="birthDate" onChange={this.handleChange} 
                  value={customer.birthDate} />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Anniversary:</label>
                <input type="date" className="form-control" name="anniversaryDate" onChange={this.handleChange} 
                  value={customer.anniversaryDate} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-lg-12">
                <input type="checkbox" name="is_pc" checked={customer.is_pc} className="form-control" 
                  onChange={this.handleChange} />
                <label>Is registered as preferred customer?</label>
              </div>
            </div>
            { 
              this.state.customer.is_pc && <div className="row">    
                  <div className="col-12 col-sm-6 col-lg-6">
                    <label>Preferred Customer Id:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} value={customer.pc_id} 
                     name="pc_id" placeholder="Preferred Customer ID" required="required"/>
                  </div>
                  <div className="col-12 col-sm-6 col-lg-6">
                    <label>Preferred Customer password:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} value={customer.password} 
                     name="password" placeholder="Preferred Customer password" required="required"/>
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
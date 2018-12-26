import React, {Component} from 'react';
import axios from 'axios';

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        userId: String,
        name: 'New Customer',
        mobile: '',
        emailId: '',
        birthDate: '',
        anniversary: '',
        incomeBracket: '',
        pcId: null,
        password: null        
      },
    };
  }

  async componentDidMount() {
    //const { match: { params } } = this.props;
    //console.log(params);
    //const customer = (await axios.get(`https://us-central1-my-customer-30842.cloudfunctions.net/getCustomer?id=${params.customerId}`)).data;
    //console.log(customer.customer);
    //this.setState({
        //customer: customer.customer
    //});
    
  }

  render() {
    const {customer} = this.state;
    if (customer === null) return <p>Loading ...</p>;
    return (
      <div className="container wrapper-form">
        <form>
          <h2>Add Customer</h2>
          <p className="hint-text">Create your account. It's free and only takes a minute.</p>
          <div className="form-group">
            <div className="row">
              <div className="col-xs-6">
                <input type="text" className="form-control" name="first_name" placeholder="First Name" required="required" />
              </div>
              <div className="col-xs-6">
                <input type="text" className="form-control" name="last_name" placeholder="Last Name" required="required" />
              </div>
            </div>        	
          </div>
        </form>
      </div>
    )
  }
}

export default AddCustomer;
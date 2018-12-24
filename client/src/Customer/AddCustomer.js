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
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{customer.profile.name.first} {customer.profile.name.last}</h1>
            <p className="lead">{customer.profile.dob}</p>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    )
  }
}

export default Customer;
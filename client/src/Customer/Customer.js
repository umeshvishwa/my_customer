import React, {Component} from 'react';
import auth0Client from '../Auth';
import axios from 'axios';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
    };
  }

  async componentDidMount() {
    console.log('props');
    console.log(this.props);
    //const { match: { params } } = this.props;
    //console.log(params);
    //const customer = (await 
    axios.get(`/api/get?id=5c1e19d97dc86cb448a42c15`,{
      headers: { Authorization: `Bearer ${auth0Client.getAccessToken()}` }
    })
    .then(({data}) => {
      let customer = data.length > 0 ? data[0] : null;
      this.setState({
          customer: customer
      });
    })
    .catch((error) => {
      console.log(error);
    });
    //).data;
    
  }

  render() {
    const {customer} = this.state;
    console.log('customer');
    console.log(customer);
    if (customer === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{customer.name}</h1>
            <p className="lead">{customer.birthDate}</p>
            <hr className="my-4" />
          </div>
        </div>
      </div>
    )
  }
}

export default Customer;
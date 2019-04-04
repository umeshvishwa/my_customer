import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import qs from 'query-string';
import moment from 'moment';
import CustomerRecentOrderProducts from './CustomerRecentOrderProducts';

class Customer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
    };
  }

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    let queryParams = qs.parse(this.props.location.search);
    
    $http.get(`/customer/get`, {
      params: {
        id: `${queryParams.id}`,
        user: `${userProfile.sub}`
      }
    })
    .then(({data}) => {
      this.setState({
          customer: data
      });
    })
    .catch((error) => {
      console.log(error);
    });
    //).data;
  }

  getAge(birthDate) {
    return moment().diff(moment(birthDate, 'YYYY-MM-DD'), 'years');
  }

  render() {
    const {customer} = this.state;
    
    if (customer === null) return <p>Loading ...</p>;
    return (
      <div className="container customer">
        <div className="row">
          <div className="col-md-offset-2 col-md-8 col-lg-6">
            <div className="well profile">
                  <div className="col-sm-12">
                    <div className="row">
                      <div className="col-12">
                        <h2>{customer.firstName} {customer.lastName}</h2>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xs-12 col-sm-8">
                          <p>
                            <strong>Birth: </strong> {moment(customer.birthDate, 'YYYY-MM-DD').format('DD MMM YYYY')} 
                            <strong style={{"paddingLeft": "15px"}}>Age: </strong> {this.getAge(customer.birthDate)} 
                          </p>
                          {customer.anniversary !== '' && <p><strong>Anniversary: </strong> {moment(customer.anniversary, 'YYYY-MM-DD').format('DD MMM YYYY')} </p>}
                          {customer.email !== '' && <p><strong>Email: </strong> {customer.email} </p>}
                          {customer.mobile !== '' && <p><strong>Mobile: </strong> {customer.mobile} </p>}
                      </div>             
                      <div className="col-xs-12 col-sm-4">
                          <p><strong>Address: </strong>
                              {customer.line1 && <span className="label">{customer.line1}</span> }
                              {customer.line2 && <span className="label">{customer.line2}</span>}
                              {customer.city && <span className="label">{customer.city}</span>}
                              {customer.postal_code && <span className="label"> - {customer.postalCode}</span>}
                              {customer.state && <span className="label">{customer.state}</span>}
                              {customer.country && <span className="label">{customer.country}</span>}
                          </p>
                          {customer.incomeBracket !== '' && <p><strong>Income Range: </strong> {customer.incomeBracket} </p>}
                          {customer.pcId !== null && <p>
                            <strong>CustomerID: </strong> {customer.pcId} 
                            <strong>Password: </strong> {customer.password} 
                          </p>}   
                      </div>
                    </div>
                  </div>            
                  <div className="col-xs-12 divider text-center">
                      <CustomerRecentOrderProducts cid={customer._id}/>
                      <div className="col-xs-12 col-sm-4 emphasis">
                          <h2><strong>245</strong></h2>                    
                          <p><small>Following</small></p>
                          <Link to={`/customer/family/add?cust_id=` + customer._id}>
                            <button className="btn btn-info btn-block">
                              <span className="fa fa-user"></span>Add Family
                            </button>
                          </Link>                          
                      </div>
                      <div className="col-xs-12 col-sm-4 emphasis">
                          <h2><strong>43</strong></h2>                    
                          <p><small>Snippets</small></p>
                          <div className="btn-group dropup btn-block">
                            <button type="button" className="btn btn-primary"><span className="fa fa-gear"></span> Options </button>
                            <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                              <span className="caret"></span>
                              <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <ul className="dropdown-menu text-left" role="menu">
                              <li><a href="#"><span className="fa fa-envelope pull-right"></span> Send an email </a></li>
                              <li><a href="#"><span className="fa fa-list pull-right"></span> Add or remove from a list  </a></li>
                              <li className="divider"></li>
                              <li><a href="#"><span className="fa fa-warning pull-right"></span>Report this user for spam</a></li>
                              <li className="divider"></li>
                              <li><a href="#" className="btn disabled" role="button"> Unfollow </a></li>
                            </ul>
                          </div>
                      </div>
                  </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Customer);
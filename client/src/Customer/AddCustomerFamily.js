import React, {Component} from 'react';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import qs from 'query-string';

class AddCustomerFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {
        userId: '',
        name: '',
        birthDate: '',
        relation: [],     
        customer: null
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

    const pageTitle = (queryParams.id === undefined) ? 'Add Family Member' : 'Edit Family Member';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <p className="hint-text">Create your customer to record their information.</p>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.name} 
                  name="name" placeholder="Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Relation:</label>
                <select className="form-control" name="relation" value={customer.relation} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Birth Date:</label>
                <input type="date" className="form-control" name="birthDate" onChange={this.handleChange} 
                  value={customer.birthDate} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-4 col-lg-4 mt-2">
                <input type="button" name="addFamily" className="form-control btn btn-primary" onClick={this.handleSubmit} value="Add" />
              </div>
            </div>
            
          </div>
        </form>
      </div>
    )
  }
}

export default AddCustomerFamily;
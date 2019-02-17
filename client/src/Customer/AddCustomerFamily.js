import React, {Component} from 'react';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import qs from 'query-string';

class AddCustomerFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familyMember: {
        userId: '',
        name: '',
        birthDate: '',
        relation: '',     
        customer: null
      },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    let queryParams = qs.parse(this.props.location.search);
    
    let {familyMember} = this.state;
    familyMember["userId"] = userProfile.sub;
    familyMember["customer"] = queryParams.cust_id;
    this.setState({ familyMember })
    
    if(queryParams.id !== undefined) {
      //this.loadCustomer(queryParams.id, userProfile.sub);
    }
    console.log(this.state.familyMember)
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
    let {familyMember} = this.state;
    familyMember[name] = value;
    
    this.setState({ familyMember })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    if(this.state.familyMember._id === undefined) {
      $http.post("/customer/family/add", this.state.familyMember)
      .then(({data}) => {
        if(data.familyMember._id) {
          this.props.history.push('/customer/view/', {
            id: this.state.familyMember.customer,
            user: this.state.familyMember.userId
          })
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    } else {
      $http.post("/customer/family/update", this.state.familyMember)
      .then(({data}) => {
        if(data.familyMember._id) {
          this.props.history.push('/customer/view/', {
            id: this.state.familyMember.customer,
            user: this.state.familyMember.userId
          })
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    }
  }

  render() {
    const relations = [
      {name:"Brother", value:"Brother"},
      {name:"Sister", value:"Sister"},
      {name: "Son", value: "Son"}, 
      {name: "Daughter", value: "Daughter"}, 
      {name: "Spouse", value: "Spouse"}, 
      {name: "Father", value: "Father"}, 
      {name: "Mother", value: "Mother"}, 
      {name: "GrandSon", value: "GrandSon"}, 
      {name: "GrandDaughter", value: "GrandDaughter"}, 
      {name: "GrandMother", value: "GrandMother"}, 
      {name: "GrandFather", value: "GrandFather"}];
    const {familyMember} = this.state;
    let queryParams = qs.parse(this.props.location.search);
    if (familyMember === null) return <p>Loading ...</p>;

    const pageTitle = (queryParams.cust_id === undefined) ? 'Add Family Member' : 'Edit Family Member';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <p className="hint-text">Add family member of customer</p>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Name:</label>
                <input type="text" className="form-control" onChange={this.handleChange} 
                  value={familyMember.name} name="name" placeholder="Name" required="required" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Relation:</label>
                <select className="form-control" name="relation" onChange={this.handleChange} 
                  value={familyMember.relation}>
                  <option value="">Select relation</option>
                  { relations.map((option, i) => <option key={i} value={option.value}>{option.name}</option>)}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Birth Date:</label>
                <input type="date" className="form-control" name="birthDate" onChange={this.handleChange} 
                  value={familyMember.birthDate} />
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
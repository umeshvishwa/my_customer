import React, {Component} from 'react';
import auth0Client from '../Auth';
import $http from '../Utility/Http';
import qs from 'query-string';
import SelectBox from '../Custom/SelectBox'

class AddCustomerProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: {
        deliveryDate: Date,
        offerGiven: String,
        firstCall: Date,
        secondCall: Date,
        serviceRating: 0,
        productRating: 0,
        referenceGiven: String,
        remarks: String,
        product: {_id:''},
        customer: {_id: ''}
      },
      products: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    let queryParams = qs.parse(this.props.location.search);
    let routeParams = this.props.match.params;

    let {feedback} = this.state;
    feedback["customer"]._id = routeParams.cid;
    this.setState({ feedback })
    
    this.getAllProducts()
    if(routeParams.cid !== undefined) {
      this.loadCustomer(routeParams.cid, userProfile.sub);
    }
  }

  /**
   * Method to increment loading counter to display loader
   */
  increamentLoadingCounter() {
    let loading = this.state.loading + 1;
    this.setState(Object.assign(this.state, {loading: loading}));
  }
  /**
   * Method to decrement loading counter to hide loader
   */
  decreamentLoadingCounter() {
    if(this.state.laoding === 0) return ;
    let loading = this.state.loading - 1;
    this.setState(Object.assign(this.state, {loading: loading}));
  }

  loadCustomer(id, user) {
    this.increamentLoadingCounter();
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
      this.decreamentLoadingCounter();
    });
  }

  /**
   * Method to get all the product categories
   */
  getAllProducts() {
    this.increamentLoadingCounter();
    $http.get(`/products/all`)
    .then(({data}) => {
      if(!data.error) {
        let products = data.result.map((product) => {
          return {
            text: `${product.name}`,
            value: `${product._id}`
          }
        })
        this.setState(Object.assign(this.state, {
          products
        }));
      }      
    })
    .catch((reason) => {
      console.error('On Error: ' + reason);
    })
    .finally(() => {
      this.decreamentLoadingCounter();
    }); 
  }

  onProductChange(selectedProduct) {
    let {feedback} = this.state;
    feedback.product._id = `${selectedProduct.value}`;
    this.setState({ feedback })
    console.log(this.state)
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
    const {customer, feedback} = this.state;
    
    let queryParams = qs.parse(this.props.location.search);
    if (customer === undefined) return <p>Loading ...</p>;

    const pageTitle = (queryParams.id === undefined) ? 'Add Product' : 'Edit Product';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <p className="hint-text">delivered to {customer.firstName}</p>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Product:</label>
                <SelectBox list={this.state.products} onChange={this.onProductChange} value={feedback.product._id}/>
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>delivery Date:</label>
                <input type="date" className="form-control" name="deliveryDate" onChange={this.handleChange} 
                  value={feedback.deliveryDate} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Offer Given:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={feedback.offerGiven}  
                 name="offerGiven" placeholder="Offer given" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Email ID:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={customer.email}  
                 name="email" placeholder="Email" required="required" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>First Call:</label>
                <input type="date" className="form-control" name="firstCall" onChange={this.handleChange} 
                  value={feedback.firstCall} />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Second Call:</label>
                <input type="date" className="form-control" name="secondCall" onChange={this.handleChange} 
                  value={feedback.secondCall} />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Service Rating:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={feedback.serviceRating} 
                 name="serviceRating" placeholder="Rate service" />
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Product Rating:</label>
                <input type="text" className="form-control" onChange={this.handleChange} value={feedback.productRating} 
                 name="productRating" placeholder="Rate product" />
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Reference Given:</label>
                <textarea className="form-control" onChange={this.handleChange} value={feedback.referenceGiven} 
                 name="referenceGiven" placeholder="Given References" cols="20" rows="10"/>
              </div>
              <div className="col-12 col-sm-6 col-lg-6">
                <label>Remarks (if any):</label>
                <textarea className="form-control" onChange={this.handleChange} value={feedback.remarks} 
                 name="remarks" placeholder="Remarks if any" cols="20" rows="10"/>
              </div>
            </div>
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

export default AddCustomerProduct;
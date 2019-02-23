import React, {Component} from 'react';
//import auth0Client from '../Auth';
import $http from '../Utility/Http';
//import qs from 'query-string';
import Pagination from "react-js-pagination";

class ManageBrand extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      brand: {
        name: '',
      },
      brands: [],
      totalCount: 0,
      page: {
        current: 1,
        size: 5
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    let {brand} = this.state;
    this.setState({ brand })
    this.getAllBrands();
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

  /**
   * Method to get all the product brands
   */
  getAllBrands() {
    this.increamentLoadingCounter();
    $http.get(`/product/brand?page=${this.state.page.current}&size=${this.state.page.size}`)
    .then(({data}) => {
      if(!data.error) {
        this.setState(Object.assign(this.state, {
            brands: data.result,
            totalCount: data.totalCount
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
  handlePageChange(pageNumber) {
    this.setState(Object.assign(this.state, {
        page: {
          current: pageNumber,
          size: this.state.page.size
        }
    }));
    this.getAllBrands();
  }
  /**
   * Method to get all the product brands
   */
  editBrand() {
    this.increamentLoadingCounter();
    /*$http.get("/product/brand")
    .then(({data}) => {
      console.log(data);
      this.setState(Object.assign(this.state, {
          brands: data,
      }));
    })
    .catch((reason) => {
      console.error('On Error: ' + reason);
    })
    .finally(() => {
      this.decreamentLoadingCounter();
    });*/ 
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let {brand} = this.state;
    brand[name] = value;
    
    this.setState({ brand })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    //Condition for add product
    if(this.state.brand._id === undefined) {
      $http.post("/product/brand", this.state.brand)
      .then(({data}) => {
        if(data.hasOwnProperty('productBrand') && data.productBrand._id) {
          //load brands
          this.getAllBrands()
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    } else {//Condition for update product
      $http.put("/product/brand", this.state.brand)
      .then(({data}) => {
        if(data.hasOwnProperty('productBrand') && data.productBrand._id) {
          this.getAllBrands();
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    }
  }

  brandRow(brand, i) {
    return <tr key={i}>
      <th scope="row">{i+1}</th>
      <td>{brand.name}</td>
      <td>
      <span className="icon-edit" onClick={() => this.editBrand(brand._id)}>
        <i className="fa fa-edit"></i>
      </span> 
      <span className="icon-trash" onClick={() => this.showConfirmModal(brand._id)}>
        <i className="fa fa-trash"></i>
      </span> 
      </td>
    </tr>
  }

  resetForm() {
    this.setState(Object.assign(this.state, {
        brand: {name: ''},
    }));
  }

  showConfirmModal(selectedCustomerId) {
    /*this.setStateValue({
      isModalDisplay: true,
      selectedCustomerId: selectedCustomerId
    });*/
  }

  render() {
    const {brand} = this.state;
    if (brand === null) return <p>Loading ...</p>;

    const pageTitle = 'Manage Brands';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="col-8 col-sm-8">
                  <label>Brand Name:</label>
                  <input type="text" className="form-control" onChange={this.handleChange} value={brand.name} 
                    name="name" placeholder="Brand Name" required="required" />
                </div>
                <div className="col-4 col-sm-4 mt-2 bottom-align">
                  <input type="button" name="addBrand" className="form-control btn btn-primary" onClick={this.handleSubmit} value="Add" />
                </div>
              </div>
            </div>
            
            { 
              this.state.brands && 
              <table className="table mt-4">
                <caption>List of Brands</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Brand Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.brands.map(this.brandRow)}
                </tbody>
                <tfoot>
                  { Math.ceil(this.state.totalCount/this.state.page.size) > 1 && 
                    <div>
                      <Pagination
                        activePage={this.state.page.current}
                        itemsCountPerPage={this.state.page.size}
                        totalItemsCount={this.state.totalCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                      />
                    </div>
                  }
                </tfoot>
              </table>
            }

          </div>
        </form>
      </div>
    )
  }
}

export default ManageBrand;
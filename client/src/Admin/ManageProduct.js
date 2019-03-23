import React, {Component} from 'react';
//import auth0Client from '../Auth';
import $http from '../Utility/Http';
//import qs from 'query-string';
import Pagination from "react-js-pagination";
import BrandSelectBox from '../Custom/SelectBox'

class ManageProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      product: {
        name: '',
        category: '',
        brand: ''
      },
      products: [],
      brands: [
        {text: 'Satinique', value:'Satinique'}
      ],
      categories: [],
      totalCount: 0,
      page: {
        current: 1,
        size: 5
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editProduct = this.editProduct.bind(this);
  }

  async componentDidMount() {
    let {product} = this.state;
    this.setState({ product })
    this.getAllProducts();
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
   * Method to get all the product categories
   */
  getAllProducts() {
    this.increamentLoadingCounter();
    $http.get(`/product?page=${this.state.page.current}&size=${this.state.page.size}`)
    .then(({data}) => {
      if(!data.error) {
        this.setState(Object.assign(this.state, {
            products: data.result,
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
    this.getAllProducts();
  }
  /**
   * Method to get all the product categories
   */
  editProduct(productId) {
    this.state.categories.map((product) => {
      if(product._id === productId) {
        let productObj = JSON.parse(JSON.stringify(product));
        this.setState({ product : productObj })
      }      
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let {product} = this.state;
    product[name] = value;
    
    this.setState({ product })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    //Condition for add product
    if(this.state.product._id === undefined) {
      $http.post("/product", this.state.product)
      .then(({data}) => {
        if(data.hasOwnProperty('product') && data.product._id) {
          //load categories
          this.getAllProducts()
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    } else {//Condition for update product
      $http.put(`/product/${this.state.product._id}`, this.state.product)
      .then(({data}) => {
        if(data.hasOwnProperty('product') && data.product._id) {
          this.getAllProducts();
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    }
  }

  productRow() {
    return this.state.categories.map((product, i) => (<tr key={i}>
      <td>{product.name}</td>
      <td>{product.name}</td>
      <td>{product.name}</td>
      <td>
      <span className="icon-edit" onClick={() => this.editProduct(product._id)}>
        <i className="fa fa-edit"></i>
      </span> 
      <span className="icon-trash" onClick={() => this.showConfirmModal(product._id)}>
        <i className="fa fa-trash"></i>
      </span> 
      </td>
    </tr>))
  }


  resetForm() {
    let product = {name: ''};
    this.setState({product});
  }

  showConfirmModal(selectedCustomerId) {
    /*this.setStateValue({
      isModalDisplay: true,
      selectedCustomerId: selectedCustomerId
    });*/
  }

  render() {
    const {product} = this.state;
    if (product === null) return <p>Loading ...</p>;
    const btnTitle = (product._id === undefined) ? 'Add' : 'Update';
    const pageTitle = 'Manage Products';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6 col-lg-12">
                <div className="row">
                  <div className="col-8 col-sm-8 col-lg-3">
                    <label>Product Name:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} value={product.name} 
                      name="name" placeholder="Product Name" required="required" />
                  </div>
                  <div className="col-8 col-sm-8 col-lg-3">
                    <label>Product Category:</label>
                    <input type="text" className="form-control" onChange={this.handleChange} value={product.name} 
                      name="name" placeholder="Product Name" required="required" />
                  </div>
                  <div className="col-8 col-sm-8 col-lg-3">
                    <label>Product Brand:</label>
                    <BrandSelectBox list={this.state.brands} />
                  </div>                  
                </div>
                <div className="row">
                  <div className="col-4 col-sm-4 mt-2 bottom-align col-lg-3">
                    <input type="button" name="addProduct" className="form-control btn btn-primary" 
                      onClick={this.handleSubmit} value={btnTitle} />
                  </div>  
                </div>
              </div>
            </div>
            
            { 
              this.state.categories && 
              <table className="table mt-4">
                <caption>List of Categories</caption>
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.productRow()
                  }
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

export default ManageProduct;
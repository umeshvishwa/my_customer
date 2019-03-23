import React, {Component} from 'react';

class SelectBox extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {selectValue: ''}
    this.handleChange = this.handleChange.bind(this);
    
  }

  async componentDidMount() {
    //this.setState({ selectValue: '' })
    //this.getAllProducts();
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
  /*getAllBrands() {
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
  }*/
  /**
   * Method to get all the product categories
   */
  /*editProduct(productId) {
    this.state.categories.map((product) => {
      if(product._id === productId) {
        let productObj = JSON.parse(JSON.stringify(product));
        this.setState({ product : productObj })
      }      
    })
  }
*/
  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    console.log(name + " " + value)    
    this.setState({ selectValue: value })
  }
  /*
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
*/
  render() {
    
    return (
      <select className="form-control" value={this.state.selectValue} onChange={this.handleChange} >
          <option value="">Select</option>
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
      </select>
    )
  }
}

export default SelectBox;
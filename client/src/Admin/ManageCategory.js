import React, {Component} from 'react';
//import auth0Client from '../Auth';
import $http from '../Utility/Http';
//import qs from 'query-string';
import Pagination from "react-js-pagination";

class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 0,
      category: {
        name: '',
      },
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
    this.editCategory = this.editCategory.bind(this);
  }

  async componentDidMount() {
    let {category} = this.state;
    this.setState({ category })
    this.getAllCategories();
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
  getAllCategories() {
    this.increamentLoadingCounter();
    $http.get(`/product/category?page=${this.state.page.current}&size=${this.state.page.size}`)
    .then(({data}) => {
      if(!data.error) {
        this.setState(Object.assign(this.state, {
            categories: data.result,
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
    this.getAllCategories();
  }
  /**
   * Method to get all the product categories
   */
  editCategory(categoryId) {
    this.state.categories.map((category) => {
      if(category._id === categoryId) {
        let categoryObj = JSON.parse(JSON.stringify(category));
        this.setState({ category : categoryObj })
      }      
    })
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let {category} = this.state;
    category[name] = value;
    
    this.setState({ category })
  }
  handleSubmit(event) {
    event.preventDefault();
    
    //Condition for add product
    if(this.state.category._id === undefined) {
      $http.post("/product/category", this.state.category)
      .then(({data}) => {
        if(data.hasOwnProperty('productCategory') && data.productCategory._id) {
          //load categories
          this.getAllCategories()
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    } else {//Condition for update product
      $http.put(`/product/category/${this.state.category._id}`, this.state.category)
      .then(({data}) => {
        if(data.hasOwnProperty('productCategory') && data.productCategory._id) {
          this.getAllCategories();
          this.resetForm()
        }
      })
      .catch(reason => {
        console.error("Error:" + reason);
      });
    }
  }

  categoryRow() {
    return this.state.categories.map((category, i) => (<tr key={i}>
      <td>{category.name}</td>
      <td>
      <span className="icon-edit" onClick={() => this.editCategory(category._id)}>
        <i className="fa fa-edit"></i>
      </span> 
      <span className="icon-trash" onClick={() => this.showConfirmModal(category._id)}>
        <i className="fa fa-trash"></i>
      </span> 
      </td>
    </tr>))
  }


  resetForm() {
    let category = {name: ''};
    this.setState({category});
  }

  showConfirmModal(selectedCustomerId) {
    /*this.setStateValue({
      isModalDisplay: true,
      selectedCustomerId: selectedCustomerId
    });*/
  }

  render() {
    const {category} = this.state;
    if (category === null) return <p>Loading ...</p>;
    const btnTitle = (category._id === undefined) ? 'Add' : 'Update';
    const pageTitle = 'Manage Categories';
    return (
      <div className="container wrapper-form">
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="userId" value=""></input>
          <h2>{pageTitle}</h2>
          <div className="form-group">
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="col-8 col-sm-8">
                  <label>Category Name:</label>
                  <input type="text" className="form-control" onChange={this.handleChange} value={category.name} 
                    name="name" placeholder="Category Name" required="required" />
                </div>
                <div className="col-4 col-sm-4 mt-2 bottom-align">
                  <input type="button" name="addCategory" className="form-control btn btn-primary" 
                    onClick={this.handleSubmit} value={btnTitle} />
                </div>
              </div>
            </div>
            
            { 
              this.state.categories && 
              <table className="table mt-4">
                <caption>List of Categories</caption>
                <thead>
                  <tr>
                    <th scope="col">Category Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.categoryRow()
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

export default ManageCategory;
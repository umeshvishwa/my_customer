import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import $http from '../Utility/Http';

class CustomerRecentOrderProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: {_id: ''},
      feedbacks: []
    };
  }

  async componentDidMount() {
    let userProfile = auth0Client.getProfile();
    
    $http.get(`/feedbacks`, {
      params: {
        cid: `${this.props.cid}`,
        user: `${userProfile.sub}`,
        page: 1,
        size: 3
      }
    })
    .then(({data}) => {
      if(!data.error) {
        this.setState({
          feedbacks: data.result
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
    //).data;
  }

  getProductHtml() {
    let style = {
      "text-align": "left"
    }
    let items = this.state.feedbacks.map((f) => {
      return <li style={style}>{f.product.name}</li>
    })
    return items;
  }

  render() {    
    if (this.props.cid === '') return <p>Loading ...</p>;
    var productList = this.getProductHtml();
    return (
      <div className="col-xs-12 col-sm-4 emphasis">
          <ul>{productList}</ul>
          <p><small>Top 3 ordered products</small></p>
          <button className="btn btn-success btn-block" 
            onClick={() => {this.props.history.push(`/customer/product/add/${this.props.cid}`)}}>
            <span className="fa fa-plus-circle"></span> Add Product 
          </button>
      </div>
    )
  }
}

export default withRouter(CustomerRecentOrderProducts);
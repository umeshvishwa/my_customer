import React, {Component} from 'react';

class SelectBox extends Component {
  constructor(props) {
    super(props);

    this.state = {selectValue: ''}
    this.handleChange = this.handleChange.bind(this);    
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

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    let selectedValue = this.props.list.filter((item) => item.value === value);   
    this.setState({ selectValue: value })
    this.props.onChange(selectedValue.length > 0 ? selectedValue[0]: false);
  }
  
  render() {
    let list = this.props.list;
    let optionItems = list.map((item) =>
            <option key={item.value} value={item.value}>{item.text}</option>
        );
    return (
      <select className="form-control" value={this.state.selectValue} onChange={this.handleChange} >
          <option value="">Select</option>
          {this.props.list.length > 0 && optionItems}
      </select>
    )
  }
}

export default SelectBox;
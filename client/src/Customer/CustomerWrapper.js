import React from 'react';
import AddCustomer from './AddCustomer';
import Customer from './Customer';

class CustomerWrapper extends React.Component{
    render(){
        console.log(this.props.params);
        if(this.props.match.params.customer_id !== undefined){
             return <Customer {...this.props}/>
        } else {
            return <AddCustomer {...this.props}/>
        }
    }
}

export default CustomerWrapper;
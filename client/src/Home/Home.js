import React, {Component} from 'react';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        
        axios.get('/api/server/up')
        .then((response) => {
            console.log(response)
        })
        .catch(reason => {
            console.log(reason);
        })
    }
    render() {
        return (
            <div>
                <h1>Welcome to My Customer App.</h1>
            </div>
        );
    }
}

export default Home;
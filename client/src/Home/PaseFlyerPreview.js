import React, {Component} from 'react';
import $http from '../Utility/Http';

class Home extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            hostedBy: '',
            venue: '',
            topics: []  
        }
    }

    async componentDidMount() {
        this.loadPaseFlyer();
    }

    loadPaseFlyer() {
        $http.get("/flyer/all")
        .then(({data}) => {
            if(data.result.length > 0) {
                this.setState({...this.state, ...data.result[0] });
            }
        })
        .catch(reason => {
          console.error("Error:" + reason);
        })
        .finally(() => {
          console.log('Finally');
        });
    }

    render() {
        return (
            <div class="container flyer">
                <div class="row">
                    <div class="col-12">
                        <div className="card">
                            {/*<img class="card-img-top" src="..." alt="Card image cap" />*/}
                            <div className="card-header text-center">
                                {this.state.title}
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">HOSTED BY: {this.state.hostedBy}</h5>
                            </div>
                            <ul className="list-group list-group-flush">
                            { this.state.topics && this.state.topics.map((t, idx) => (
                                <li className="list-group-item" key={idx}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{t.title}</h5>
                                        <small>{t.duration}</small>
                                    </div>
                                    <p className="mb-1">{t.description}</p>
                                    <small>By {t.presentedBy}</small>
                                </li>
                                ))
                            }
                            </ul>
                            <div className="card-footer">
                                <p className="card-text"><strong>Venue:</strong></p>
                                
                                <address className="text-muted">
                                    {this.state.venue}
                                </address>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
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
        //this.topics = this.state.paseFlyer.topics;
        //this.handleRemoveTopic = this.handleRemoveTopic.bind(this);
        this.handleAddTopic = this.handleAddTopic.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTopicTitleChange = this.handleTopicTitleChange.bind(this);
        this.handleTopicDurationChange = this.handleTopicDurationChange.bind(this);
        this.handleTopicDescriptionChange = this.handleTopicDescriptionChange.bind(this);
        this.handleTopicPresentedByChange = this.handleTopicPresentedByChange.bind(this);
        this.handleSaveAndPreview = this.handleSaveAndPreview.bind(this);
    }

    async componentDidMount() {
        this.loadPaseFlyer();
    }

    loadPaseFlyer() {
        $http.get("/flyer/all")
        .then(({data}) => {
            if(data.result.length > 0) {
                this.setState({...this.state, ...data.result[0] });
                this.setState({isUpdate: true})
            } else {
                this.setState({isUpdate: false})
            }
        })
        .catch(reason => {
          console.error("Error:" + reason);
        })
        .finally(() => {
          console.log('Finally');
        });
    }

    handleSaveAndPreview(event) {

        event.preventDefault();
        if(!this.state.isUpdate) {
            $http.post("/flyer/add", this.state)
            .then(({data}) => {
                if(data._id) {
                    this.props.history.push('/pase/preview')
                }
            })
            .catch(reason => {
                console.error("Error:" + reason);
            });
        } else {
            $http.put("/flyer/"+this.state._id, this.state)
            .then(({data}) => {
                if(data) {
                    this.props.history.push('/pase/preview')
                }
            })
            .catch(reason => {
                console.error("Error:" + reason);
            });
        }
        
    }
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let paseFlyer = this.state;
        paseFlyer[name] = value;
        
        this.setState(paseFlyer)
    }

    handleTopicTitleChange = idx => evt => {
        const newTopics = this.state.topics.map((topic, tidx) => {
            if (idx !== tidx) return topic;
            return {...topic, title: evt.target.value};
        });
        
        this.setState({ topics: newTopics });
    }
    handleTopicDurationChange = idx => evt => {
        const newTopics = this.state.topics.map((topic, tidx) => {
            if (idx !== tidx) return topic;
            return {...topic, duration: evt.target.value};
        });
        
        this.setState({ topics: newTopics });
    }
    handleTopicDescriptionChange = idx => evt => {
        const newTopics = this.state.topics.map((topic, tidx) => {
            if (idx !== tidx) return topic;
            return {...topic, description: evt.target.value};
        });
        
        this.setState({ topics: newTopics });
    }
    handleTopicPresentedByChange = idx => evt => {
        const newTopics = this.state.topics.map((topic, tidx) => {
            if (idx !== tidx) return topic;
            return {...topic, presentedBy: evt.target.value};
        });
        
        this.setState({ topics: newTopics });
    }
    handleAddTopic(event) {
        this.setState({
            topics: this.state.topics.concat([{title: '', duration: '', description: '', presentedBy: ''}])
        })
    }
    render() {
        
        return (
            <div className="container flyer">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            {/*<img class="card-img-top" src="..." alt="Card image cap" />*/}
                            <div className="card-header text-center">
                                <input type="text" className="form-control" onChange={this.handleChange} 
                                value={this.state.title} name="title" placeholder="Title" required="required" />  
                            </div>
                            <div className="card-body">
                                <h5 className="card-title">
                                    <input type="text" className="form-control" onChange={this.handleChange} 
                                value={this.state.hostedBy} name="hostedBy" placeholder="Hosted By" required="required" />
                                </h5>
                                <input type="button" className="form-control btn btn-primary" onClick={this.handleAddTopic} value="Add Topic" />
                            </div>
                            <ul className="list-group list-group-flush">
                            {this.state.topics.map((t, idx) => (
                                <li className="list-group-item" key={idx} >
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">
                                        <input type="text" className="form-control" onChange={this.handleTopicTitleChange(idx)} 
                                value={t.title} name='topic' placeholder="Topic Title" required="required" />
                                        </h5>
                                        <small>
                                        <input type="text" className="form-control" onChange={this.handleTopicDurationChange(idx)} 
                                value={t.duration} name='duration' placeholder="Topic Duration" required="required" />
                                        </small>
                                    </div>
                                    <p className="mb-1">
                                        <input type="text" className="form-control" onChange={this.handleTopicDescriptionChange(idx)} 
                                value={t.description} name='description' placeholder="Topic Description" required="required" />    
                                    </p>
                                    <small>
                                    <input type="text" className="form-control" onChange={this.handleTopicPresentedByChange(idx)} 
                                value={t.presentedBy} name='presentedBy' placeholder="Presented By" required="required" />
                                    </small>
                                </li>
                                ))
                            }
                            </ul>
                            <div className="card-footer">
                                <p className="card-text"><strong>Venue:</strong></p>
                                
                                <address className="text-muted">
                                    <input type="text" className="form-control" onChange={this.handleChange} 
                                value={this.state.venue} name="venue" placeholder="Venue" required="required" />
                                </address>
                                
                            </div>
                            <input type="button" className="form-control btn btn-primary" onClick={this.handleSaveAndPreview} value="Preview" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
import React, {Component} from 'react';
import constants from '../config';
import {Link} from 'react-router-dom';

class AccessDenied extends Component {

    constructor(props) {
        super(props);
    
        this.handleAction = this.handleAction.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleAction() {
        this.props.onButtonClick(true);
    }

    handleClose() {
        this.props.onButtonClick(false);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error-template">
                            <h1>{constants.message.ERROR_OOPS}</h1>
                            <h2>{constants.message.ERROR_TITLE_403}</h2>
                            <div className="error-details">
                                {constants.message.ERROR_DETAILS_403}
                            </div>
                            <div className="error-actions">
                                <Link to="/" className="btn btn-primary btn-lg">
                                    <span className="fas fa-home"></span>
                                    Take Me Home 
                                </Link>
                                <Link to="mailto:umesh.vishwa@gmail.com" className="btn btn-default btn-lg">
                                    <span className="far fa-envelope"></span> Contact Support 
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccessDenied;
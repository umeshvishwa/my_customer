import React, {Component} from 'react';

class ConfirmModal extends Component {

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
        const actionButtonTitle = this.props.actionButton ? this.props.actionButton : 'OK';
        const closeButtonTitle = this.props.closeButton ? this.props.closeButton : 'Close';
        const toggleDisplay = this.props.show ? 'block' : 'none';
        return (
            <div className="modal" style={{display: toggleDisplay}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{this.props.title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>{this.props.body}</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.handleAction}>
                            {actionButtonTitle}
                        </button>
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.handleClose}>
                            {closeButtonTitle}
                        </button>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ConfirmModal;
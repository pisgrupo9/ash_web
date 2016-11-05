import React, { Component, PropTypes } from 'react';

class ConfirmModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.onConfirm = this.onConfirm.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onConfirm() {
    if (this.props.confirm.confirmF)
      this.props.confirm.confirmF();
    this.props.onClose();
  }

  onCancel() {
    if (this.props.confirm.cancelF)
      this.props.confirm.cancelF();
    this.props.onClose();
  }

  render() {
    const { confirm } = this.props;
    let messageDialog = confirm.message.split("<br/>")
      .map( (message, index) => {
        return (<div key={index}>{message}<br/></div>);
      });

    return (
        <div id="modal" className="confirm-modal">
          {confirm.title &&
            <h1 className="confirm-title">
            {confirm.title}
            </h1>
          }
          {this.props.confirm.message &&
            <div className="confirm-message dark-grey-color">
              {messageDialog}
            </div>
          }
          <div className="center-buttons">
            <button onClick={this.onConfirm} className="btn">
              {confirm.confirmLabel ? confirm.confirmLabel : 'CONFIRMAR'}
            </button>
            <button onClick={this.onCancel} className="btn cancel-button">
              {confirm.cancelLabel ? confirm.cancelLabel : 'CANCELAR'}
            </button>
          </div>
        </div>
    );
  }
}

const { object, func } = PropTypes;

ConfirmModal.propTypes = {
  confirm: object.isRequired,
  onClose: func.isRequired
};

export default ConfirmModal;

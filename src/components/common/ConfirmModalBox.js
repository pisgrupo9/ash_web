import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ConfirmModal from './ConfirmModal';

class ConfirmModalBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showConfirm: false
    };

    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.confirm && nextProps.confirm != this.props.confirm) {
      this.setState({ showConfirm: true });
    }
  }

  onClose() {
    this.setState({ showConfirm: false });
  }

  render() {
    const { confirm } = this.props;
    const size = confirm.size ? confirm.size : 'small';
    return (
        <Modal show={this.state.showConfirm} onHide={this.onClose} bsSize={size} className={confirm.styleClass}>
          <ConfirmModal onClose={this.onClose} confirm={confirm} />
        </Modal>
    );
  }
}

const { object } = PropTypes;

ConfirmModalBox.propTypes = {
  confirm: object.isRequired
};

const mapState = (state) => ({ confirm: state.confirm });

export default connect(mapState)(ConfirmModalBox);

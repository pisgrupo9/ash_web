import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as serverStatusActions from '../../actions/serverStatusActions';
import '../../styles/server-status.scss';

class ServerStatusPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { serverStatus } = this.props;
    let online = serverStatus.online ? 'Conectado' : 'No conectado';
    let statusClass = serverStatus.online ? 'green-color' : 'red-color';
    return (
      <div className="status-container">
        <span>Estado del servidor: </span>
        <span className={statusClass}>{online}</span>
      </div>
    );
  }
}

const { object } = PropTypes;

ServerStatusPage.propTypes = {
  serverStatus: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ serverStatus: state.serverStatus });

const mapDispatch = (dispatch) => ({ actions: bindActionCreators(serverStatusActions, dispatch) });

export default connect(mapState, mapDispatch)(ServerStatusPage);

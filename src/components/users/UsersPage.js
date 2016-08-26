import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/userActions';

import UserList from './UserList';

class UsersPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { users } = this.props;
    return (
      <div>
        <h1>Users</h1>
        <UserList users={users} />
      </div>
    );
  }
}

const { object, array } = PropTypes;

UsersPage.propTypes = {
  users: array.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ users: state.users });

const mapDispatch = (dispatch) => ({ actions: bindActionCreators(userActions, dispatch) });

export default connect(mapState, mapDispatch)(UsersPage);

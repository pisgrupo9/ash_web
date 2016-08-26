import React, { PropTypes } from 'react';
import UserListRow from './UserListRow';

const UserList = ({ users }) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Created</th>
        <th>Updated</th>
      </tr>
      </thead>
      <tbody>
      {users.map(user =>
        <UserListRow key={user.id} user={user} />
      )}
      </tbody>
    </table>
  );
};

const { array } = PropTypes;

UserList.propTypes = {
  users: array.isRequired
};

export default UserList;
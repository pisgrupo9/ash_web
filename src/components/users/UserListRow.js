import React, { PropTypes } from 'react';

const UserListRow = ({ user }) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.age}</td>
      <td>{user.created_at}</td>
      <td>{user.updated_at}</td>
    </tr>
  );
};

const { object } = PropTypes;

UserListRow.propTypes = {
  user: object.isRequired
};

export default UserListRow;
import React, { Component, PropTypes } from 'react';
import AddComment from './AddComment';

class AdopterComments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
  }

  render() {
    const { adopterId } = this.props;

    return (
      <div>
        <AddComment adopterId={adopterId}/>
      </div>
    );
  }
}

const { string } = PropTypes;

AdopterComments.propTypes = {
  adopterId: string.isRequired
};

export default AdopterComments;

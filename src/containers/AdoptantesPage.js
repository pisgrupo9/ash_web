import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterListWrapper from '../components/adopters/AdopterListWrapper';

class AdoptantesPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className="wrapper-flex">
        <AdopterListWrapper />
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AdoptantesPage);

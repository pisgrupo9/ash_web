import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdopterListWrapper from '../components/adopters/AdopterListWrapper';
import AddAdoptionButton from '../components/adoptions/AddAdoptionButton';

class AdoptantesPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div className="wrapper-flex">
        <AddAdoptionButton adopterId="36" />
        <AdopterListWrapper />
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AdoptantesPage);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAdopterButton from '../components/adopters/AddAdopterButton';
import AdopterListWrapper from '../components/adopters/AdopterListWrapper';

class AdoptantesPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <p>Proximamente Adoptantes</p>
        <AddAdopterButton />
        <div className="wrapper-flex">
          <AdopterListWrapper />
        </div>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AdoptantesPage);

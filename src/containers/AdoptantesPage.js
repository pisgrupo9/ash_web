import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddAdopterButton from '../components/adopters/AddAdopterButton';

class AdoptantesPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render () {
    return (
      <div>
        <p>Proximamente Adoptantes</p>
        <AddAdopterButton />
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(AdoptantesPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import AddAnimalButton from '../components/animals/AddAnimalButton';
import { Link } from 'react-router';
import AnimalList from '../components/animals/AnimalList';

class AnimalListPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {
    this.props.actions.loadAnimals();
  }

  render() {
    const { animals } = this.props;

    return (
      <div>
        <AddAnimalButton />
        <AnimalList animals={animals}/>
      </div>
    );
  }
}

const { array, object } = PropTypes;

AnimalListPage.propTypes = {
  animals: array.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ animals: state.animals });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalListPage);

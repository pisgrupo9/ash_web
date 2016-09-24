import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import AnimalList from './AnimalList';
import AnimalListHeader from './AnimalListHeader';
import '../../styles/animal-list.scss';

class AnimalListWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { selectedAnimalId: '' };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadAnimals();
  }

  onClick(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString()
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  render() {
    const { animals } = this.props;
    return (
      <div className="general-list">
        <AnimalListHeader />
        <AnimalList animals={animals}
                    onClick={this.onClick}
                    selectedAnimalId={this.state.selectedAnimalId}/>
      </div>
    );
  }
}

const { array, object } = PropTypes;

AnimalListWrapper.propTypes = {
  animals: array.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
   animals: state.animals
 });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalListWrapper);

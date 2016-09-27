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

    this.state = { selectedAnimalId: '',
                    loading: true,
                    currPage: 1
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadAnimals(3, 1);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  onClick(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString();
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  onClickViewMore() {
    let nextPage = this.state.currPage + 1;
    this.setState({ currPage: nextPage });
    this.setState({ loading: true });
    this.props.actions.loadAnimals(3, nextPage);
  }

  render() {
    const { animals } = this.props;
    const showViewMore = this.state.currPage < animals.total_pages;
    return (
      <div className="general-list">
        <AnimalListHeader />
        <AnimalList animals={animals.animals}
                    onClick={this.onClick}
                    selectedAnimalId={this.state.selectedAnimalId}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={this.state.loading}/>
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

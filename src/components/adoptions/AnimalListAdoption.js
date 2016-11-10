import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import AnimalList from '../animals/AnimalList';
import * as consts from '../../constants/apiConstants.js';
import ModalAnimalButtons from '../common/ModalAnimalButtons';
import AnimalAdoptionHeader from './AnimalAdoptionHeader';
import '../../styles/animal-list.scss';

class AnimalListAdoption extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAnimalId: '',
      loading: true,
      loadingList: true,
      currPage: 1,
      rows: consts.ANIMAL_LINK_PAGE_SIZE,
      filter: {
        type: 'Adoptable',
        castrated: true,
        vaccines: true,
        adopted: false
      }
    };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.onStartLoading = this.onStartLoading.bind(this);
  }

  componentWillMount() {
    let { rows, currPage, filter } = this.state;
    this.props.actions.loadAnimals(rows, currPage, filter);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, loadingList: false });
    if (nextProps.animals.firstPage) {
      this.setState({ currPage: 1 });
    }
  }

  componentWillUnmount() {
    this.props.actions.cleanAnimals();
  }

  onClick(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString();
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let nextPage = currPage + 1;
    const { animals } = this.props;
    this.setState({ currPage: nextPage, loading: true });
    this.props.actions.loadAnimals(rows, nextPage, animals.filterParam);
  }

  onStartLoading() {
    this.setState({ loading: true, loadingList: true });
  }

  render() {
    let { animals, onClose } = this.props;
    let { selectedAnimalId, loadingList, loading } = this.state;
    let showViewMore = this.state.currPage < animals.totalPages;

    return (
      <div className="general-list-link adoption-list">
        <AnimalAdoptionHeader animalCount={this.props.checkedAnimals.length}
                              onStartLoading={this.onStartLoading}/>
        <AnimalList animals={animals.animals}
                    onClick={this.onClick}
                    onCheck={this.props.onCheck}
                    selectedAnimalId={selectedAnimalId}
                    checkedAnimals={this.props.checkedAnimals}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={loading}
                    loadingList={loadingList}/>
        <ModalAnimalButtons title="AGREGAR"
                            onSubmit={this.props.onSubmit}
                            onClose={onClose} />
      </div>
    );
  }
}

const { object, func, string, array } = PropTypes;

AnimalListAdoption.propTypes = {
  animals: object.isRequired,
  adopterId: string.isRequired,
  checkedAnimals: array.isRequired,
  onClose: func.isRequired,
  onCheck: func.isRequired,
  onSubmit: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ animals: state.animals });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalListAdoption);

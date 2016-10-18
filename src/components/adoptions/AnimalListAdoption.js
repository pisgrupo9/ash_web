import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import AnimalList from '../animals/AnimalList';
import * as consts from '../../constants/apiConstants.js';
import ModalAnimalButtons from '../common/ModalAnimalButtons';
import AnimalAdoptionHeader from './AnimalAdoptionHeader';
import '../../styles/animal-list.scss';
import _ from 'lodash';

class AnimalListAdoption extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAnimalId: '',
      checkedAnimals: [],
      loading: true,
      loadingList: true,
      currPage: 1,
      rows: consts.ANIMAL_LINK_PAGE_SIZE,
      filter: {
        species_id: "2"
      }
   };

    this.onClick = this.onClick.bind(this);
    this.onCheck = this.onCheck.bind(this);
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

  onCheck(animalId) {
    let { checkedAnimals } = this.state;
    const alreadyAnimal = _.indexOf(checkedAnimals, animalId) !== -1;
    if (alreadyAnimal) {
      _.remove(checkedAnimals, function (checkedAnimalId) {
        return checkedAnimalId === animalId;
      });
    } else {
      checkedAnimals.push(animalId);
    }
    this.setState({ checkedAnimals });
  }

  onSubmit() {
    let { checkedAnimals } = this.state;
    checkedAnimals.forEach(function(animalId) {
      this.props.actions.addAdoption(this.props.adopterId, animalId);
    });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let nextPage = currPage + 1;
    const { animals } = this.props;
    this.setState({ currPage: nextPage });
    this.setState({ loading: true });
    this.props.actions.loadAnimals(rows, nextPage, animals.filterParam);
  }

  onStartLoading() {
    this.setState({ loading: true, loadingList: true });
  }

  render() {
    const { animals, onClose } = this.props;
    const { checkedAnimals, selectedAnimalId, loadingList } = this.state;
    const showViewMore = this.state.currPage < animals.totalPages;
    const loading = this.state.loading;

    return (
      <div className="general-list-link">
        <AnimalAdoptionHeader animalCount={checkedAnimals.length}
                              onStartLoading={this.onStartLoading}/>
        <AnimalList animals={animals.animals}
                    onClick={this.onClick}
                    onCheck={this.onCheck}
                    selectedAnimalId={selectedAnimalId}
                    checkedAnimals={checkedAnimals}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={loading}
                    loadingList={loadingList}/>
          <ModalAnimalButtons title="AGREGAR"
                              onSubmit={this.onSubmit}
                              onClose={onClose} />
      </div>
    );
  }
}

const { object, func, string } = PropTypes;

AnimalListAdoption.propTypes = {
  animals: object.isRequired,
  adopterId: string.isRequired,
  onClose: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ animals: state.animals });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalListAdoption);

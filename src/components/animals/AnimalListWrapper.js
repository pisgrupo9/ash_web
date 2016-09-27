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

    this.state = {
      selectedAnimalId: '',
      loading: true,
      currPage: 1,
      rows: 15
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    this.props.actions.loadAnimals(rows, currPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false });
    if (nextProps.animals.first_page) {
      this.setState({ currPage: 1 });
    }
  }

  onClick(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString();
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let nextPage = currPage + 1;
    this.setState({ currPage: nextPage });
    this.setState({ loading: true });
    this.props.actions.loadMoreAnimals(rows, nextPage);
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

const { object } = PropTypes;

AnimalListWrapper.propTypes = {
  animals: object.isRequired,
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

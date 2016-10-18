import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import Input from '../common/Input';
import * as consts from '../../constants/apiConstants.js';
import '../../styles/animal-list.scss';

class AdoptionSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: {
        name: ''
      },
      timeout: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onSubmit() {
    this.props.startLoading();
    let { filter } = this.state;
    let { filterParam } = this.props;
    let allFilters = Object.assign({}, filterParam, filter);
    this.props.actions.loadAnimals(consts.ANIMAL_LINK_PAGE_SIZE, 1, allFilters);
  }

  onChange(e) {
    const { value } = e.target;
    let { timeout } = this.state;
    clearTimeout(timeout);
    timeout = setTimeout(this.onSubmit, 500);
    this.setState({
      filter: { name: value },
      timeout
    });
  }

  render() {
    let { name } = this.state.filter;

    return (
      <div className="event-search-container">
        <Input styleClass="filter-event-field grey-color"
                name="name"
                placeholder="Nombre"
                type="text"
                value={name}
                onKeyPress={this.onKeyPress}
                onChange={this.onChange}
              />
        <div className="btn-find-event">
          <button className="btn orange-btn"
                  onClick={this.onSubmit}>
            BUSCAR
          </button>
        </div>
      </div>
    );
  }
}

const { object, func } = PropTypes;

AdoptionSearch.propTypes = {
  filterParam: object.isRequired,
  startLoading: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ filterParam: state.animals.filterParam });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdoptionSearch);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../../actions/eventActions';
import Input from '../../common/Input';
import '../../../styles/animal-list.scss';

class EventSearch extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      filter: ''
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
    let { filter } = this.state;
    this.props.actions.searchEvent(this.props.animalId, filter);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ filter: value });
  }

  render() {
    let { filter } = this.state;

    return (
      <div className="event-search-container">
        <Input styleClass="filter-event-field grey-color"
                name="name"
                placeholder="Texto"
                type="text"
                value={filter}
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

const { object, string } = PropTypes;

EventSearch.propTypes = {
  animalId: string.isRequired,
  actions: object.isRequired
};

const mapState = () => ({});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EventSearch);

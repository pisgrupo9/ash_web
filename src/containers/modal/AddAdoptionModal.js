import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adoptionActions from '../../actions/adoptionActions';
import * as adopterActions from '../../actions/adopterActions';
import AnimalListAdoption from '../../components/adoptions/AnimalListAdoption';
import * as messages from '../../constants/apiMessage';
import Spinner from 'react-spinkit';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';
import '../../styles/animal-list.scss';
import moment from 'moment';
import * as valid from '../../util/validateForm';

class AddAdoptionModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      checkedAnimals: [],
      loading: false,
      adoptionsToSend: 0,
      success: true,
      adoptionDate: moment().format('YYYY-MM-DD'),
      errorDate: ''
    };

    this.onCheck = this.onCheck.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let { adoptionsToSend, checkedAnimals, success } = this.state;
    if (!nextProps.success) {
      this.props.onToggleBackdrop();
      this.setState({ success: false });
    }
    if (nextProps.adoptionsSended === adoptionsToSend) {
      let { adopterId } = this.props;
      if (success && nextProps.success && checkedAnimals.length === 1) {
        this.props.adopterActions.showPerfilAdopter(adopterId);
        toastr.success('', messages.SUCCESS_ADOPTION_ANIMAL);
      } else if (success && nextProps.success && checkedAnimals.length > 1) {
        this.props.adopterActions.showPerfilAdopter(adopterId);
        toastr.success('', messages.SUCCESS_ADOPTION_ANIMALS);
      } else {
        toastr.error('', messages.ERROR_ADOPTION_ANIMAL);
      }
      this.props.onToggleBackdrop();
      this.props.onClose();
    }
  }

  onCheck(animalId) {
    let animals = _.clone(this.state.checkedAnimals);
    const alreadyAnimal = _.indexOf(animals, animalId) !== -1;
    if (alreadyAnimal) {
      _.remove(animals, function (checkedAnimalId) {
        return checkedAnimalId === animalId;
      });
    } else {
      animals.push(animalId);
    }
    this.setState({ checkedAnimals: animals });
  }

  onChange(e) {
    const value = e.target.value;
    const errorDate = valid.lessThanToday(value);
    this.setState({ adoptionDate: value, errorDate });
  }

  onSubmit() {
    let { checkedAnimals, adoptionDate } = this.state;
    let { adopterId, actions, adoptionsSended } = this.props;
    if (!_.isEmpty(checkedAnimals)) {
      this.props.onToggleBackdrop();
      this.setState({
        loading: true,
        adoptionsToSend: adoptionsSended + checkedAnimals.length
      });
      checkedAnimals.forEach(function(animalId) {
        actions.addAdoption(adopterId, animalId.toString(), adoptionDate);
      });
    }
  }

  render() {
    let { onClose, adopterId } = this.props;
    let { loading, adoptionDate, errorDate } = this.state;
    const loadingView = (
      <div className="loading-container">
        <Spinner spinnerName="three-bounce" noFadeIn />
      </div>
    );
    const animalList = (
      <AnimalListAdoption onClose={onClose}
                          adopterId={adopterId}
                          onCheck={this.onCheck}
                          onSubmit={this.onSubmit}
                          checkedAnimals={this.state.checkedAnimals}
                          adoptionDate={adoptionDate}
                          errorDate={errorDate}
                          onChange={this.onChange}/>
    );

    return (
      <div id="modal" className="list-flex">
        <div className="wrapper-flex-modal">
          { loading ? loadingView : animalList }
        </div>
      </div>
    );
  }
}

const { object, func, string, number } = PropTypes;

AddAdoptionModal.propTypes = {
  onClose: func.isRequired,
  onToggleBackdrop: func.isRequired,
  adopterId: string.isRequired,
  adoptionsSended: number.isRequired,
  actions: object.isRequired,
  adopterActions: object.isRequired
};

const mapState = (state) => ({
  success: state.adoptionForm.success,
  adoptionsSended: state.adoptionForm.adoptionsSended
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adoptionActions, dispatch),
    adopterActions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddAdoptionModal);

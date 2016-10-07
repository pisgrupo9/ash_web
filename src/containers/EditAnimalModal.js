import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import AnimalEditForm from '../components/animals/AnimalEditForm';
import * as valid from '../util/validateForm';
import Spinner from 'react-spinkit';
import * as messages from '../constants/apiMessage';
import '../styles/animal-perfil.scss';
import '../styles/animal-form.scss';

class EditAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profilePic: {},
      loading: false,
      animal: {
        chip_num: '',
        species_id: '',
        name: '',
        profile_image: '',
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: false,
        vaccines: false,
        weight: '',
      },
      modifiedFields: {
        chip_num: false,
        species_id: false,
        name: false,
        profile_image: false,
        sex: false,
        admission_date: false,
        birthdate: false,
        death_date: false,
        race: false,
        castrated: false,
        vaccines: false,
        weight: false
      },
      errors: {
        chip_num: '',
        species_id: '',
        name: '',
        profile_image: '',
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: '',
        vaccines: ''
      }
    };
    this.validateForm = this.validateForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDropProfile = this.onDropProfile.bind(this);
  }

  componentWillMount() {
    this.props.animalActions.loadSpecies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.props.loading();
      this.onClose();
    }
    if (Object.keys(nextProps.errors).length === 0) {
      let animal = Object.assign({}, this.state.animal, this.props.animal);
      this.setState({ animal: animal });
    }
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.animalActions.cancelAnimalForm();
  }

  onClose() {
    this.props.animalActions.cancelAnimalForm();
    this.props.onClose();
  }

  isDateType(name) {
    return name === 'death_date' || name === 'birthdate' || name === 'admission_date';
  }

  validateForm(animal) {
    let errors = this.state.errors;
    const death_or_addmission = (name) => {
      return name === 'death_date' || name === 'admission_date';
    };
    for (let name in animal) {
      if (animal[name] && this.isDateType(name)) {
        errors[name] = valid.lessThanToday(animal[name]);
        if (!errors.birthdate && !errors[name] && death_or_addmission(name)) {
          errors[name] = valid.compareDates(animal[name], animal.birthdate, 'Nacimiento');
        }
      }
    }
    this.setState({ errors });
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateForm(this.state.animal);
    let { species_id } = this.state.animal;
    let errors = this.state.errors;
    let { race } = this.state.animal;
    if ((this.state.modifiedFields[ "name" ]) && (this.state.animal[ "name" ] == "")) {
      errors.name = messages.ERROR_EMPTY_NAME;
      this.setState({ errors: errors });
    } else if (valid.requiredRace(species_id) && (!race)) {
      errors.race = messages.ERROR_EMPTY_RACE;
      this.setState({ errors: errors });
    } else {
      let animal = {};
      for (let name in this.state.animal) {
        if (this.state.modifiedFields[name]) {
          if (name == "sex") {
            const value = (this.state.animal[name] == "Macho" ? "male" : "female");
            animal[name] = value;
          } else {
            animal[name] = this.state.animal[name];
          }
        }
      }
      if (JSON.stringify(animal) != "{}") {
        this.props.animalActions.editAnimal(this.props.route_id, { animal });
        this.setState({ loading: true });
      } else {
        this.onClose();
      }
    }
  }

  onChange(e) {
    const { modifiedFields, animal } = this.state;
    const field = e.target.name;
    const checkbox = field === 'vaccines' || field === 'castrated';
    const value = checkbox ? e.target.checked : e.target.value;
    animal[ field ] = value;
    modifiedFields[field] = true;
    this.setState({ animal, modifiedFields });
  }

  onDropProfile(img) {
    const reader = new FileReader();
    const file = img[0];
    this.setState({ profilePic: file });
    reader.readAsDataURL(file);
    reader.onload = (upload) => {
      let animal = this.state.animal;
      animal["profile_image"] = upload.target.result;
      this.setState({ animal });
    };
    const { modifiedFields } = this.state;
    modifiedFields["profile_image"] = true;
    this.setState({ modifiedFields });
  }

  render () {
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> EDITAR ANIMALES </h2>
                    <AnimalEditForm animal={this.state.animal}
                                    species={this.props.species}
                                    profilePic={this.state.profilePic}
                                    onSave={this.onSubmit}
                                    onClose={this.onClose}
                                    onChange={this.onChange}
                                    onDropProfile={this.onDropProfile}
                                    errors={localErrors ? this.state.errors : this.props.errors}/>
                  </div>);
    const getView = () => {
      if (this.state.loading) {
        return loadingView;
      } else {
        return body;
      }
    };
    return (
      <div>
        { getView() }
      </div>
    );
  }
}

const { object, func, array, string } = PropTypes;

EditAnimalModal.propTypes = {
  errors: object.isRequired,
  species: array.isRequired,
  onClose: func.isRequired,
  animalActions: object.isRequired,
  animal: object.isRequired,
  route_id: string.isRequired,
  loading: func.isRequired
};

const mapState = (state) => {
  const errors = {};
  for (let error in state.animalForm.errors) {
    errors[error] = state.animalForm.errors[error][0];
  }

  return {
    species: state.species,
    errors: errors,
    success: state.animalForm.success
  };
};

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAnimalModal);

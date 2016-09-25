import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import AnimalEditForm from '../components/animals/AnimalEditForm';
import '../styles/animal-perfil.scss';
import '../styles/animal-form.scss';

class EditAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profilePic: {},
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
        vaccines: false
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
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDropProfile = this.onDropProfile.bind(this);
  }

  componentWillMount() {
    this.props.animalActions.loadSpecies();
  }

  componentWillReceiveProps() {
    let animal = Object.assign({}, this.state.animal, this.props.animal);
    this.setState({ animal: animal });
  }

  onClose() {
    this.props.onClose();
    this.props.loading();
  }

  onSubmit() {
    let animal = {};
    for (let name in this.state.animal) {
      if (this.state.modifiedFields[name]) {
        animal[name] = this.state.animal[name];
      }
    }
    this.props.animalActions.editAnimal(this.props.route_id, { animal });
    this.onClose();
  }

  onChange(e) {
    const { modifiedFields, animal } = this.state;
    const field = e.target.name;
    const checkbox = field === 'vaccines' || field === 'castrated';
    const isBirthdate = field == 'birthdate';
    const value = isBirthdate ? e.target.value.concat('-01') : (checkbox ? e.target.checked : e.target.value);
    animal[ field ] = value;
    modifiedFields[field] =true;
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
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> EDITAR ANIMALES </h2>
                    <AnimalEditForm animal={this.state.animal}
                                    species={this.props.species}
                                    profilePic={this.state.profilePic}
                                    onSave={this.onSubmit}
                                    onClose={this.onClose}
                                    onChange={this.onChange}
                                    onDropProfile={this.onDropProfile}
                                    />
                  </div>);
    return (
      <div>
        { body };
      </div>
    );
  }
}

const { object, func, array, string } = PropTypes;

EditAnimalModal.propTypes = {
  species: array.isRequired,
  onClose: func.isRequired,
  animalActions: object.isRequired,
  animal: object.isRequired,
  route_id: string.isRequired,
  loading: func.isRequired
};

const mapState = (state) => {
  return {
    species: state.species
  };
};

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAnimalModal);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';
import ImagesGallery from '../components/animals/ImagesGallery';
import AddGalleryButton from '../components/animals/AddGalleryButton';
import Spinner from '../components/common/SpinnerComponet';
import '../styles/animal-perfil.scss';

class AnimalPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loading_gallery: true,
      edit: false,
      animal: {
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: false,
        vaccines: false
      }
    };

    this.edit = this.edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidMount() {
    this.props.animalActions.showPerfilAnimal(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animal.name) {
      this.setState({ loading: false });
    }
    if (nextProps.animal.images) {
      this.setState({ loading_gallery: false });
    }
    let animal = Object.assign({}, this.state.animal, nextProps.animal);
    this.setState({ animal: animal });
  }

  edit() {
   this.setState({ edit: true });
  }

  onClose() {
    let animal = Object.assign({}, this.state.animal, this.props.animal);
    this.setState({ animal: animal, edit: false });
  }

  onSubmit() {
    this.props.animalActions.editAnimal(this.props.routeParams.id, this.state.animal);
    this.setState({ edit: false })
  }

  onChange(e) {
    const field = e.target.name;
    const booleanValue = field === 'vaccines' || field === 'castrated';
    const value = booleanValue ? (e.target.value === 'true' ? true : false) : e.target.value;
    let animal = this.state.animal;
    animal[ field ] = value;
    this.setState({ animal: animal });
  }

  render() {
    const { animal } = this.props;
    return (
      <div className="p-relative">
        <Row className="page">
          <Col lg={3} md={4} sm={6} xs={12}>
            {(this.state.edit ? <InfoPerfil styleClass="perfil-div info-div"
                                animal={this.state.animal}
                                edit={this.edit}
                                editState={this.state}
                                onSave={this.onSubmit}
                                onChange={this.onChange}
                                onCancel={this.onClose}/>

                            : <InfoPerfil styleClass="perfil-div info-div"
                                animal={this.props.animal}
                                edit={this.edit}
                                editState={this.state}
                                onSave={this.onSubmit}
                                onChange={this.onChange}
                                onCancel={this.onClose}/>
            )}
          </Col>
          <Col lg={9} md={8} sm={6} xs={12}>
            <div className="perfil-div event-div">
              <p>Proximamente Eventos</p>
            </div>
            <div className="perfil-div gallery-div">
              <div className="gallery-buttons">
                <p className="center">Galería</p>
                <AddGalleryButton animalId={this.props.routeParams.id}/>
              </div>
              <Spinner active={this.state.loading_gallery}/>
              {animal.images && !this.state.loading_gallery &&
                  <ImagesGallery images={animal.images}/>
              }
            </div>
          </Col>
        </Row>
        <Spinner active={this.state.loading}/>
      </div>
    );
  }
}

const { object } = PropTypes;

AnimalPerfilPage.propTypes = {
  animal: object.isRequired,
  animalActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ animal: state.animal });

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);

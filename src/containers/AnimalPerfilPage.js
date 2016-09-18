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
      loading_gallery: true
    };
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
    if (nextProps.animal.uplaodImages) {
        this.props.animalActions.showPerfilAnimalImages(this.props.routeParams.id);
        this.setState({ loading_gallery: true });
    }
  }

  render() {
    const { animal } = this.props;
    return (
      <div className="p-relative">
        <Row className="page">
          <Col lg={3} md={4} sm={6} xs={12}>
            <InfoPerfil animal={animal} styleClass="perfil-div info-div"/>
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

const mapState = (state) => ({
  animal: state.animal
});

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StickyContainer } from 'react-sticky';
import AdopterInfo from '../components/adopters/perfil/AdopterInfo';
import AdopterAnimals from '../components/adopters/perfil/AdopterAnimals';
import '../styles/adopter-perfil.scss';
import * as adopterActions from '../actions/adopterActions';
import * as confirmActions from '../actions/confirmActions';
import AddAdoptionButton from '../components/adoptions/AddAdoptionButton';
import AdopterComments from '../components/adopters/comments/AdopterComments';
import _ from 'lodash';

class AdopterPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loadingComent: true,
      adopterId: '',
      loadingAdopt: true,
      selectedAnimalId: ''
    };

    this.loading = this.loading.bind(this);
    this.onClickAnimalId = this.onClickAnimalId.bind(this);
  }

  componentWillMount() {
    let adopterId = this.props.routeParams.id;
    this.props.adopterActions.showPerfilAdopter(adopterId);
    this.setState({ adopterId, loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.adopter)) {
      this.setState({ loading: false });
    }
  }

  loading() {
    const { adopterId } = this.state;
    this.props.adopterActions.showPerfilAdopter(adopterId);
    this.setState({ loading: true });
  }

  onClickAnimalId(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString();
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  render() {
    const { adopter, routeParams } = this.props;
    const { loading, adopterId } = this.state;
    const animalList = (
      <AdopterAnimals animals={adopter.animals}
                      onClick={this.onClickAnimalId}
                      selectedAnimalId={this.state.selectedAnimalId}
                      loading={loading}/>
    );
    return (
      <div className="profile-page-flex">
        <StickyContainer className="perfil-div adopter">
          <div className="h-100">
            <AdopterInfo styleClass="info-div profile-section"
                          loading={loading}
                          adopterId={adopterId}
                          adopter={adopter}
                          loadingFunc={this.loading}/>
          </div>
        </StickyContainer>
        <div className="other-section adopter">
          <div className="animal-list-div">
            <div className="animal-list-title"> Animales adoptados por {adopter.first_name}:</div>
            {animalList}
            { !loading && !adopter.blacklisted &&
              <AddAdoptionButton adopterId={routeParams.id} /> }
          </div>
          <div className="coment-div">
            <AdopterComments adopterId={routeParams.id} />
          </div>
        </div>
      </div>
    );
  }
}

const { object } = PropTypes;

AdopterPerfilPage.propTypes = {
  adopter: object.isRequired,
  user: object.isRequired,
  routeParams: object.isRequired,
  adopterActions: object.isRequired,
  confirmActions: object.isRequired
};

AdopterPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => {
  return {
    adopter: state.adopter,
    user: state.user
  };
};

const mapDispatch = (dispatch) => {
  return {
    adopterActions: bindActionCreators(adopterActions, dispatch),
    confirmActions: bindActionCreators(confirmActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdopterPerfilPage);

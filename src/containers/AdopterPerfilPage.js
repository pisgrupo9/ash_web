import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StickyContainer } from 'react-sticky';
import AdopterInfo from '../components/adopter/AdopterInfo';
import '../styles/adopter-perfil.scss';
import * as adopterActions from '../actions/adopterActions';
import _ from 'lodash';

class AdopterPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loadingComent: true,
      adoptanteId: null,
      loadingAdopt: true
    };
  }

  componentWillMount() {
    let adoptanteId = this.props.routeParams.id;
    this.props.adopterActions.showPerfilAdopter(adoptanteId);
    this.setState({ adoptanteId, loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.adopter)) {
      this.setState({ loading: false });
    }
  }

  render() {
    const { adopter } = this.props;
    const { loading } = this.state;
    return (
      <div className="profile-page-flex">
        <StickyContainer className="perfil-div adopter">
          <div className="h-100">
            <AdopterInfo styleClass="info-div profile-section"
                          loading={loading}
                          adopter={adopter}
                       />
          </div>
        </StickyContainer>
        <div className="other-section adopter">
          <div className="animal-list-div">
            ANIMALES
          </div>
          <div className="coment-div">
            COMENTARIOS
          </div>
        </div>
      </div>
    );
  }
}

const { object } = PropTypes;

AdopterPerfilPage.propTypes = {
  adopter: object.isRequired,
  routeParams: object.isRequired,
  adopterActions: object.isRequired
};

AdopterPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => {
  return {
    adopter: state.adopter,
  };
};

const mapDispatch = (dispatch) => {
  return {
    adopterActions: bindActionCreators(adopterActions, dispatch),
  };
};

export default connect(mapState, mapDispatch)(AdopterPerfilPage);

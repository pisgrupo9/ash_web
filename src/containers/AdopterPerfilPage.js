import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StickyContainer } from 'react-sticky';
import AdopterInfo from '../components/adopters/perfil/AdopterInfo';
import '../styles/adopter-perfil.scss';
import * as adopterActions from '../actions/adopterActions';
import _ from 'lodash';

class AdopterPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loadingComent: true,
      adopterId: '',
      loadingAdopt: true
    };

    this.loading = this.loading.bind(this);
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

  render() {
    const { adopter } = this.props;
    const { loading, adopterId } = this.state;
    return (
      <div className="profile-page-flex">
        <StickyContainer className="perfil-div adopter">
          <div className="h-100">
            <AdopterInfo styleClass="info-div profile-section"
                          loading={loading}
                          adopterId={adopterId}
                          adopter={adopter}
                          loadingFunc={this.loading}
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
  user: object.isRequired,
  routeParams: object.isRequired,
  adopterActions: object.isRequired
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
  };
};

export default connect(mapState, mapDispatch)(AdopterPerfilPage);

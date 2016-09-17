import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';

class AnimalPerfil extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.animalActions.showPerfilAnimal(this.props.routeParams.id);
  }

  render() {
    return (
      <Row>
        <Col lg={4} md={6} sm={12} xs={12}>
          <InfoPerfil animal={this.props.animal}/>
        </Col>
      </Row>
    );
  }
}

const { object } = PropTypes;

AnimalPerfil.propTypes = {
  animal: object.isRequired,
  animalActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfil.contextTypes = {
  router: object
};

const mapState = (state) => ({ animal: state.animal });

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfil);

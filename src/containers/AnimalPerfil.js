import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Row, Col } from 'react-bootstrap';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';

class AnimalPerfil extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      edit: false,
      animal: {
        sex: '',
        admission_date: '',
        birthdate: '',
        race: '',
        death_date: '',
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
    this.props.actions.showPerfilAnimal(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
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
    this.props.actions.sendAnimalForm(this.state.animal);
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
    return (
      <Row>
        <Col lg={4} md={6} sm={12} xs={12}>
          {(this.state.edit ? <InfoPerfil animal={this.state.animal}
                                edit={this.edit}
                                editState={this.state}
                                onSave={this.onSubmit}
                                onChange={this.onChange}
                                onCancel={this.onClose}/>

                            : <InfoPerfil animal={this.props.animal}
                                edit={this.edit}
                                editState={this.state}
                                onSave={this.onSubmit}
                                onChange={this.onChange}
                                onCancel={this.onClose}/>
          )}
        </Col>
      </Row>
    );
  }
}

const { object } = PropTypes;

AnimalPerfil.propTypes = {
  animal: object.isRequired,
  actions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfil.contextTypes = {
  router: object
};

const mapState = (state) => ({ animal: state.animal });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfil);

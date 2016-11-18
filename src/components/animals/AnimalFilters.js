import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import * as message from '../../constants/apiMessage';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';

class AnimalFilters extends Component {
   constructor(props, context) {
    super(props, context);

    this.state = {
                  filter: {
                    chip_num: '',
                    species_id: '',
                    sex: '',
                    admission_date_from: null,
                    admission_date_to: null,
                    adopted: '',
                    name: '',
                    race: '',
                    castrated: '',
                    vaccines: ''
                  },
                  errorDate: '',
                  windowWidth: window.innerWidth,
                  allField: false
                };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.moreFilter = this.moreFilter.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.cleanFilter = this.cleanFilter.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadSpecies();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
   window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  moreFilter() {
    const { allField } = this.state;
    this.setState({ allField: !allField });
  }

  validateForm() {
    let { admission_date_from, admission_date_to } = this.state.filter;
    if (admission_date_from && admission_date_to &&
      admission_date_to <= admission_date_from) {
      this.setState({ errorDate: message.ERROR_DATE_FILTER });
      return false;
    }
    this.setState({ errorDate: '' });
    return true;
  }

  onSubmit() {
    if (this.validateForm()) {
      let filter = {};
      for (let name in this.state.filter) {
        if (this.state.filter[name]) {
          filter[name] = this.state.filter[name];
        }
      }
      this.props.actions.searchAnimal(filter);
    }
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const { filter } = this.state;
    const { species_id } = this.state.filter;
    const isAdoptable = species_id === "1" || species_id === "2" || species_id === "";
    const changefield = isAdoptable && field == "species_id" && value != "1" && value != "2";
    if (changefield) {
      filter.castrated = "";
      filter.vaccines = "";
    }
    filter[ field ] = value;
    this.validateForm();
    this.setState({ filter });
  }

  cleanFilter() {
     const filter = {
      chip_num: '',
      species_id: '',
      sex: '',
      admission_date_from: null,
      admission_date_to: null,
      adopted: '',
      name: '',
      race: '',
      castrated: '',
      vaccines: ''
    };
    this.setState({ filter, errorDate: '' });
    this.props.actions.searchAnimal({});
  }

  render() {
    const { filter, windowWidth, allField, errorDate } = this.state;
    const boolean = [ { id: true, name: "SI" },
                    { id: false, name: "NO" } ];
    const states = [ { id: true, name: "ADOPTADO" },
                    { id: false, name: "NO ADOPTADO" } ];
    const sex = [ { id: 0, name: "MACHO" },
                    { id: 1, name: "HEMBRA" } ];
    let smallWindows = (windowWidth <= 541);
    let activeField = (!smallWindows || allField);
    let extraFilter = (filter.species_id == "") || (filter.species_id <= 2);
    let buttonClean = (<button
                          className="btn btn-find"
                          onClick={this.cleanFilter}>
                          LIMPIAR
                        </button>);
    let buttonFind = (<button
                        className="btn btn-find"
                        onClick={this.onSubmit}>
                        BUSCAR
                      </button>);

     let buttonMore = (<button className={'btn btn-find' + (allField ? ' cancel-more-button' :'')}
                            onClick={this.moreFilter}>
                          {allField ? 'MENOS' : 'MAS'} FILTROS
                        </button>);
    return (
      <div>
          <p className="filter-title">FILTROS</p>
            <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
            <Input styleClass="filter-field grey-color"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    value={filter.name ? filter.name : ''}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                     />
            <Input styleClass="filter-field grey-color"
                    name="chip_num"
                    placeholder="Número de chip"
                    type="text"
                    value={filter.chip_num ? filter.chip_num : ''}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                     />
            {smallWindows &&
              <div className="btn-find-div btn-small-div">
                {buttonFind}
                {buttonClean}
                {buttonMore}
              </div>
            }
            </div>
            {activeField &&
              <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
                <SelectInput styleClass={'filter-field'+(
                                filter.species_id == "" ? ' default' : '')}
                      name="species_id"
                      defaultOption="Especie"
                      value={filter.species_id ? filter.species_id : ''}
                      onChange={this.onChange}
                      options={this.props.species}
                      />
                <Input styleClass="filter-field grey-color"
                      name="race"
                      placeholder="Raza"
                      type="text"
                      value={filter.race ? filter.race : ''}
                      onChange={this.onChange}
                      onKeyPress={this.onKeyPress}
                       />
                <SelectInput styleClass={'filter-field'+(
                                filter.sex == "" ? ' default' : '')}
                  name="sex"
                  defaultOption="Sexo"
                  value={filter.sex ? filter.sex : ''}
                  onChange={this.onChange}
                  options={sex}
                   />
                </div>
              }
              {(activeField && extraFilter) &&
              <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
                <SelectInput styleClass={'filter-field'+(
                                filter.castrated == "" ? ' default' : '')}
                  name="castrated"
                  defaultOption="Castrado"
                  value={filter.castrated ? filter.castrated : ''}
                  onChange={this.onChange}
                  options={boolean}
                   />
                <SelectInput styleClass={'filter-field'+(
                                filter.vaccines == "" ? ' default' : '')}
                  name="vaccines"
                  defaultOption="Vacuna"
                  value={filter.vaccines ? filter.vaccines : ''}
                  onChange={this.onChange}
                  options={boolean}
                 />
                <SelectInput styleClass={'filter-field'+(
                                filter.adopted == "" ? ' default' : '')}
                  name="adopted"
                  defaultOption="Estado"
                  value={filter.adopted ? filter.adopted : ''}
                  onChange={this.onChange}
                  options={states}
                 />
              </div>
            }
            {activeField &&
            <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
              <div className="filter-date">
                <p className="filter-text">Fec. Admisión:
                  {errorDate && (<span className="filterError">{errorDate}</span>) }</p>
                <div className={smallWindows ? 'filter-component-flex' : ''}>
                  <Input styleClass="filter-field"
                    name="admission_date_from"
                    placeholder="Desde"
                    type="date"
                    value={filter.admission_date_from ? filter.admission_date_from : ''}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                  />
                  <Input styleClass="filter-field"
                    name="admission_date_to"
                    placeholder="Hasta"
                    type="date"
                    value={filter.admission_date_to ? filter.admission_date_to : ''}
                    onChange={this.onChange}
                    onKeyPress={this.onKeyPress}
                  />
                </div>
              </div>
          </div>
          }
          {!smallWindows &&
            <div className="btn-find-div">
              {buttonFind}
              {buttonClean}
            </div>
          }
      </div>
      );
  }

}

const { object, array } = PropTypes;

AnimalFilters.propTypes = {
  species: array.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  return { species: state.species };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalFilters);

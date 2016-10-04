import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
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
                    admission_date: null,
                    name: '',
                    race: '',
                    castrated: "",
                    vaccines: "",
                    state: ""
                  },
                  windowWidth: window.innerWidth,
                  allField: false
                };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.moreFilter = this.moreFilter.bind(this);
    this.handleResize = this.handleResize.bind(this);
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

  onSubmit() {
    let filter = {};
    for (let name in this.state.filter) {
      if (this.state.filter[name]) {
            filter[name] = this.state.filter[name];
        }
    }
    this.props.actions.serchAnimal(filter);
  }

  onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const { filter } = this.state;
    filter[ field ] = value;
    this.setState({ filter });
  }

  render() {
    const { filter, windowWidth, allField } = this.state;
    const boolean = [ { id: true, name: "SI" },
                    { id: false, name: "NO" } ];
    const states = [ { id: true, name: "ADOPTADO" },
                    { id: false, name: "NO ADOPTADO" } ];
    const sex = [ { id: 0, name: "MACHO" },
                    { id: 1, name: "HEMBRA" } ];
    let smallWindows = (windowWidth <= 694);
    let activeField = (!smallWindows || allField);
    let extraFilter = (filter.species_id == "") || (filter.species_id <= 2);
    let buttonFind = (<div className="btn-find-div">
                        <button
                          className="btn btn-find bg-orange-color"
                          onClick={this.onSubmit}>
                          BUSCAR
                        </button>
                      </div>);
     let buttonMore = (<div className="btn-find-div">
                        <button className={'btn btn-find' + (allField ? ' bg-dark-grey-color' :' bg-orange-color')}
                            onClick={this.moreFilter}>
                          {allField ? 'MENOS' : 'MAS'} FILTROS
                        </button>
                      </div>);
    return (
      <div>
          <p className="filter-title">FILTROS</p>
            <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
            <Input styleClass="filter-field grey-color"
                    name="name"
                    placeholder="Nombre"
                    type="text"
                    value={filter.name}
                    onChange={this.onChange}
                     />
            <Input styleClass="filter-field grey-color"
                    name="chip_num"
                    placeholder="Número de chip"
                    type="text"
                    value={filter.chip_num}
                    onChange={this.onChange}
                     />
            {smallWindows &&
              <div className="btn-small-div">
                {buttonFind}
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
                      value={filter.species_id}
                      onChange={this.onChange}
                      options={this.props.species}
                      />
                <Input styleClass="filter-field grey-color"
                      name="race"
                      placeholder="Raza"
                      type="text"
                      value={filter.race}
                      onChange={this.onChange}
                       />
                <SelectInput styleClass={'filter-field'+(
                                filter.sex == "" ? ' default' : '')}
                  name="sex"
                  defaultOption="Sexo"
                  value={filter.sex}
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
                  value={filter.castrated}
                  onChange={this.onChange}
                  options={boolean}
                   />
                <SelectInput styleClass={'filter-field'+(
                                filter.vaccines == "" ? ' default' : '')}
                  name="vaccines"
                  defaultOption="Vacuna"
                  value={filter.vaccines}
                  onChange={this.onChange}
                  options={boolean}
                 />
                <SelectInput styleClass={'filter-field'+(
                                filter.state == "" ? ' default' : '')}
                  name="state"
                  defaultOption="Estado"
                  value={filter.state}
                  onChange={this.onChange}
                  options={states}
                 />
              </div>
            }
            {activeField &&
            <div className={smallWindows ? 'filter-component-flex' : 'filter-component'}>
              <div className="filter-date">
                <p className="filter-text">Fec. Admisión:</p>
                <Input styleClass="filter-field"
                name="admission_date"
                type="date"
                value={filter.admission_date}
                onChange={this.onChange}
                />
              </div>
          </div>
          }
          {!smallWindows && buttonFind}
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

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import * as animalActions from '../../actions/animalActions';
import * as exportActions from '../../actions/exportActions';
import AnimalList from './AnimalList';
import AnimalListHeader from './AnimalListHeader';
import SpinnerComponent from '../common/SpinnerComponent';
import * as consts from '../../constants/apiConstants.js';
import * as messages from '../../constants/apiMessage';
import '../../styles/animal-list.scss';

class AnimalListWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAnimalId: '',
      loading: true,
      currPage: 1,
      rows: consts.ANIMAL_PAGE_SIZE,
      pdfAnimals: {},
      xlsAnimals: null,
      xlsStart: true,
      pdfStart: {}
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.exportPdf = this.exportPdf.bind(this);
    this.exportXls = this.exportXls.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    this.props.actions.loadAnimals(rows, currPage);
    this.setState( { pdfAnimals: {}, xlsAnimals: '' });
  }

  componentWillReceiveProps(nextProps) {
    let { pdfAnimals, selectedAnimalId, pdfStart } = this.state;
    let { urlXls, urlPdf, filterParam } = this.props.exportUrl;
    this.setState({ loading: false });
    if (nextProps.animals.first_page) {
      this.setState({ currPage: 1 });
    }
    if (nextProps.animals.filterParam != filterParam) {
      this.setState({ xlsAnimals: '', xlsStart: true });
    }
    if (nextProps.exportUrl.urlPdf != urlPdf) {
      pdfAnimals[nextProps.exportUrl.animalId] = nextProps.exportUrl.urlPdf;
      pdfStart[nextProps.exportUrl.animalId] = true;
      this.setState({ pdfAnimals, pdfStart });
    }
    if (nextProps.exportUrl.urlXls != urlXls) {
      this.setState({ xlsAnimals: nextProps.exportUrl.urlXls, xlsStart: true });
    }
  }

  onClick(animalId) {
    const equalsId = this.state.selectedAnimalId === animalId.toString();
    this.setState({ selectedAnimalId: equalsId ? '' : animalId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let nextPage = currPage + 1;
    const { animals } = this.props;
    this.setState({ currPage: nextPage });
    this.setState({ loading: true });
    this.props.actions.loadMoreAnimals(rows, nextPage, animals.filterParam);
  }

  exportPdf() {
    let { selectedAnimalId, pdfAnimals, pdfStart } = this.state;
    if (selectedAnimalId) {
      if (pdfAnimals[selectedAnimalId]) {
        toastr.warning('', messages.FICHA_YA_CREADO);
      } else {
        if (!pdfStart[selectedAnimalId]) {
          pdfStart[selectedAnimalId] = true;
          this.setState({ pdfStart });
          this.props.exportActions.exportAnimal(selectedAnimalId);
        }
      }
    } else {
      toastr.warning('', messages.SELECIONE_UN_ANIMAL);
    }
  }

  exportXls() {
    let { filterParam } =this.props.animals;
    let { xlsAnimals, xlsStart } = this.state;
    if (xlsAnimals) {
      toastr.warning('', messages.REPORTE_YA_CREADO);
    } else if (xlsStart) {
      this.setState({ xlsStart: false });
      this.props.exportActions.exportAnimals(filterParam);
    }
  }

  render() {
    const { animals } = this.props;
    const showViewMore = this.state.currPage < animals.total_pages;
    return (
      <div className="general-list">
        <AnimalListHeader
          exportXLS={this.exportXls}
          exportPDF={this.exportPdf}
        />
        {animals.searchReady ?
         <SpinnerComponent active={animals.searchReady} />
          :
         <AnimalList animals={animals.animals}
                    onClick={this.onClick}
                    selectedAnimalId={this.state.selectedAnimalId}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={this.state.loading}/>
        }
      </div>
    );
  }
}

const { object } = PropTypes;

AnimalListWrapper.propTypes = {
  animals: object.isRequired,
  actions: object.isRequired,
  exportActions: object.isRequired,
  exportUrl: object.isRequired
};

const mapState = (state) => ({
  animals: state.animals,
  exportUrl: state.exportUrl
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch),
    exportActions: bindActionCreators(exportActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalListWrapper);

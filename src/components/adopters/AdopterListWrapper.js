import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SpinnerComponent from '../common/SpinnerComponent';
import * as consts from '../../constants/apiConstants.js';
import * as adopterActions from '../../actions/adopterActions';
import AdopterListHeader from './AdopterListHeader';
import AdopterList from './AdopterList';
import '../../styles/animal-list.scss';

class AdopterListWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAdopterId: '',
      loading: true,
      loadingList: true,
      currPage: 1,
      showBlacklist: false,
      rows: consts.ADOPTER_PAGE_SIZE
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.onToggleSearch = this.onToggleSearch.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    this.props.actions.loadAdopters(rows, currPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, loadingList: false });
    if (nextProps.adopters.firstPage) {
      this.setState({ currPage: 1 });
    }
  }

  componentWillUnmount() {
    this.props.actions.cleanAdopters();
  }

  onClick(adopterId) {
    const equalsId = this.state.selectedAdopterId === adopterId.toString();
    this.setState({ selectedAdopterId: equalsId ? '' : adopterId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let { adopters } = this.props;
    let nextPage = currPage + 1;
    this.setState({ currPage: nextPage, loading: true });
    this.props.actions.loadAdopters(rows, nextPage, adopters.filterParam);
  }

  onToggleSearch() {
    let { rows, showBlacklist } = this.state;
    let { filterParam } = this.props.adopters;
    let filter = Object.assign({}, filterParam, {});
    if (!showBlacklist) {
      filter.blacklisted = true;
    } else {
      delete filter.blacklisted;
    }
    this.setState({ showBlacklist: !showBlacklist, loadingList: true, currPage: 1 });
    this.props.actions.loadAdopters(rows, 1, filter);
  }

  render() {
    const { adopters } = this.props;
    const showViewMore = this.state.currPage < adopters.totalPages;
    return (
      <div className="general-list">
        <AdopterListHeader onToggleSearch={this.onToggleSearch}
                            showBlacklist={this.state.showBlacklist}/>
        {adopters.searchReady ?
         <SpinnerComponent active={adopters.searchReady} />
          :
         <AdopterList adopters={adopters.adopters}
                    onClick={this.onClick}
                    selectedAdopterId={this.state.selectedAdopterId}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={this.state.loading}
                    loadingList={this.state.loadingList}/>
        }
      </div>
    );
  }
}

const { object } = PropTypes;

AdopterListWrapper.propTypes = {
  adopters: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  adopters: state.adopters
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdopterListWrapper);

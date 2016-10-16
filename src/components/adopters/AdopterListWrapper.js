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
    this.onClickBlacklist = this.onClickBlacklist.bind(this);
    this.onClickShowAll = this.onClickShowAll.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    this.props.actions.loadAdopters(rows, currPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, loadingList: false });
    if (nextProps.adopters.first_page) {
      this.setState({ currPage: 1 });
    }
  }

  onClick(adopterId) {
    const equalsId = this.state.selectedAdopterId === adopterId.toString();
    this.setState({ selectedAdopterId: equalsId ? '' : adopterId.toString() });
  }

  onClickViewMore() {
    let { rows, currPage } = this.state;
    let nextPage = currPage + 1;
    const { adopters } = this.props;
    this.setState({ currPage: nextPage });
    this.setState({ loading: true });
    this.props.actions.loadMoreAdopters(rows, nextPage);
  }

  onClickBlacklist() {
    let { rows, currPage } = this.state;
    this.setState({ showBlacklist: true, loadingList: true });
    this.props.actions.loadBlacklisted(rows, 1);
  }

  onClickShowAll() {
    let { rows, currPage } = this.state;
    this.setState({ showBlacklist: false, loadingList: true });
    this.props.actions.loadAdopters(rows, 1);
  }

  render() {
    const { adopters } = this.props;
    const showViewMore = this.state.currPage < adopters.total_pages;
    return (
      <div className="general-list">
        <AdopterListHeader onClickBlacklist={this.onClickBlacklist}
                            showBlacklist={this.state.showBlacklist}
                            onClickShowAll={this.onClickShowAll} />
        {adopters.searchReady ?
         <SpinnerComponent active={adopters.searchReady} />
          :
         <AdopterList adopters={adopters.adopters}
                    onClick={this.onClick}
                    selectedAdopterId={this.state.selectedAdopterId}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={this.state.loading}
                    showBlacklist={this.state.showBlacklist}
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

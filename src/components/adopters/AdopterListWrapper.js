import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as consts from '../../constants/apiConstants.js';
import * as message from '../../constants/apiMessage.js';
import * as adopterActions from '../../actions/adopterActions';
import * as confirmActions from '../../actions/confirmActions';
import AdopterListHeader from './AdopterListHeader';
import AdopterList from './AdopterList';
import AdopterSearch from './AdopterSearch';
import '../../styles/animal-list.scss';
import { Tabs, Tab } from 'react-bootstrap';

class AdopterListWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedAdopterId: '',
      loading: true,
      loadingList: true,
      currPage: 1,
      showBlacklist: false,
      rows: consts.ADOPTER_PAGE_SIZE,
      tabKey: 1
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addToBlackList = this.addToBlackList.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    let filter = { blacklisted: false };
    this.setState({ filter });
    this.props.actions.loadAdopters(rows, currPage, filter);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loading: false, loadingList: false });
    if (nextProps.adopters.firstPage) {
      this.setState({ currPage: 1 });
    }
    if (nextProps.adopter.blackListSuccess && nextProps.adopter != this.props.adopter) {
      let { rows, filter } = this.state;
      this.props.actions.loadAdopters(rows, 1, filter);
      this.setState({ currPage: 1, loadingList: true });
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

  startLoading() {
    this.setState({ loadingList: true });
  }

  handleSelect(tabKey) {
    if (tabKey != this.state.key) {
      this.setState({ tabKey });
      let { rows } = this.state;
      let { filterParam } = this.props.adopters;
      let filter = Object.assign({}, filterParam);
      filter.blacklisted = tabKey === 2;
      this.setState({ loadingList: true, currPage: 1 });
      this.props.actions.loadAdopters(rows, 1, filter);
    }
  }

  addToBlackList(adopterId, animalsSize) {
    const confirmf = () => {
      this.props.actions.addToBlackList(adopterId);
    };
    this.props.confirmActions.confirmDialog({
      title: message.ADD_BLACK_LIST_TITLE,
      message: message.ADD_BLACK_LIST_MESSAGE(animalsSize),
      confirmF: confirmf,
      styleClass: 'black-list',
      size: 'large',
      confirmLabel: 'AGREGAR'
    });
  }

  render() {
    const { adopters, userPermission } = this.props;
    const showViewMore = this.state.currPage < adopters.totalPages;
    const tabContent = (
      <AdopterList adopters={adopters.adopters}
                    onClick={this.onClick}
                    selectedAdopterId={this.state.selectedAdopterId}
                    showViewMore={showViewMore}
                    onClickViewMore={this.onClickViewMore}
                    loading={this.state.loading}
                    loadingList={this.state.loadingList}
                    addToBlackList={this.addToBlackList}
                    userPermission={userPermission}/>
    );

    return (
      <div className="general-list">
        <AdopterListHeader/>
        <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="AdopterList" animation={false}>
          <div className="adopter-search-wrapper">
            <AdopterSearch startLoading={this.startLoading}/>
          </div>
          <Tab eventKey={1} title="Adoptantes">{tabContent}</Tab>
          <Tab eventKey={2} title="Lista Negra">{tabContent}</Tab>
        </Tabs>
      </div>
    );
  }
}

const { object, string } = PropTypes;

AdopterListWrapper.propTypes = {
  adopters: object.isRequired,
  actions: object.isRequired,
  adopter: object.isRequired,
  confirmActions: object.isRequired,
  userPermission: string.isRequired
};

const mapState = (state) => ({
  adopters: state.adopters,
  adopter: state.adopter,
  userPermission: state.user.permissions || ''
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch),
    confirmActions: bindActionCreators(confirmActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdopterListWrapper);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commentActions from '../../../actions/commentActions';
import AddComment from './AddComment';
import CommentsList from './CommentsList';
import CommentsHeader from './CommentsHeader';
import * as consts from '../../../constants/apiConstants.js';
import '../../../styles/comments.scss';

class AdopterComments extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true,
      loadingList: true,
      rows: consts.COMMENTS_PAGE_SIZE
    };

    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  componentWillMount() {
    let { rows } = this.state;
    let { adopterId, actions } = this.props;
    actions.loadComments(rows, 1, adopterId);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false, loadingList: false });
  }

  onClickViewMore() {
    let { rows } = this.state;
    let { adopterId, comments, actions } = this.props;
    let nextPage = comments.currPage + 1;
    this.setState({ loading: true });
    actions.loadComments(rows, nextPage, adopterId);
  }

  render() {
    const { onClickViewMore } = this;
    const { loading, loadingList } = this.state;
    const { adopterId, comments } = this.props;
    const showViewMore = comments.currPage < comments.totalPages;

    return (
      <div className="comments-container">
        <CommentsHeader />
        <CommentsList comments={comments.comments}
                      {...{ showViewMore, onClickViewMore, loading, loadingList }}/>
        <AddComment adopterId={adopterId}/>
      </div>
    );
  }
}

const { object, string } = PropTypes;

AdopterComments.propTypes = {
  adopterId: string.isRequired,
  comments: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({ comments: state.comments });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(commentActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AdopterComments);

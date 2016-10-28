import React, { PropTypes } from 'react';
import SpinnerComponent from '../../common/SpinnerComponent';
import CommentItem from './CommentItem';

const CommentsList = ({ comments, showViewMore, onClickViewMore, loading, loadingList }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let commentsList;
  if (comments.length) {
    commentsList = comments.map(comment => {
      return (<CommentItem key={comment.id} comment={comment}/>);
    });
  } else {
    commentsList = !loading && (<div className="no-result-search">
                                  NO SE ENCONTRARON COMENTARIOS
                                </div>);
  }

  return (
    <div>
      { !loadingList && commentsList }
      <div className="view-more-container">
        {loading ? spinner : showViewMore &&
        <button className="button-show view-more-button" onClick={onClickViewMore}>
          Ver Más
        </button>}
      </div>
    </div>
  );
};

const { array, func, bool } = PropTypes;

CommentsList.propTypes = {
  comments: array.isRequired,
  onClickViewMore: func.isRequired,
  showViewMore: bool.isRequired,
  loading: bool.isRequired,
  loadingList: bool.isRequired
};

export default CommentsList;

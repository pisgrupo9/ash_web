import React, { PropTypes } from 'react';
import moment from 'moment';
import '../../../styles/comments.scss';

const CommentItem = ({ comment }) => {
  const date = moment(comment.date).locale('es').format('h:mm a, D/M/YYYY');
  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-user">
          {`${comment.user_first_name} ${comment.user_last_name}`}
        </div>
        <div className="comment-date">
          {date}
        </div>
      </div>
      <div className="comment-container">
        {comment.text}
      </div>
    </div>
  );
};

const { object } = PropTypes;

CommentItem.propTypes = {
  comment: object.isRequired,
};

export default CommentItem;

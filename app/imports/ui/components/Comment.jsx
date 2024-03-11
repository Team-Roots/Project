import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
const Comment = ({ comment }) => (
  <ListGroup.Item>
    <p className="fw-lighter">{comment.createdAt.toLocaleDateString('en-US')}</p>
    <p>{comment.comment}</p>
  </ListGroup.Item>
);

// Require a document to be passed to this component.
Comment.propTypes = {
  comment: PropTypes.shape({
    comment: PropTypes.string,
    uniqueId: PropTypes.string,
    owner: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date),
    _id: PropTypes.string,
  }).isRequired,
};

export default Comment;

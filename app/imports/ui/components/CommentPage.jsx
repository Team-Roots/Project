import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Col, Container, Row, ListGroup } from 'react-bootstrap';
import AddComment from './AddComment';

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const location = useLocation();
  const { owner } = location.state || {};

  useEffect(() => {
    // Fetch comments logic here
    // This could be a subscription or method call in Meteor, for example:
    // const fetchedComments = Comments.find({ eventID: event._id }).fetch();
    // setComments(fetchedComments);
  }, []);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Add a Comment</h2>
          <AddComment owner={owner} />
        </Col>
        <Col xs={12} md={8}>
          <h2>Comments</h2>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment._id}>
                <p className="fw-lighter">{comment.createdAt.toLocaleDateString('en-US')}</p>
                <p>{comment.comment}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentPage;

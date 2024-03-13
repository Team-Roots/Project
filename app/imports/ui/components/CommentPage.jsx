import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row, ListGroup } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Comments } from '../../api/comment/CommentCollection';

// Assuming this schema is similar for adding and displaying comments
const formSchema = new SimpleSchema({
  comment: String,
  owner: String,
  uniqueId: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const CommentPage = ({ owner, uniqueId }) => {
  const [comments] = useState([]);

  // Fetch comments from the database (simplified example)
  useEffect(() => {
    // Fetch comments logic here
    // For example, this could be a subscription or method call in Meteor
    // setComments(fetchedComments);
  }, []);

  const submit = (data, formRef) => {
    // Insert logic adapted from AddComment.jsx
    console.log('Inserting comment:', data);
    Comments.collection.insert(
      { comment: data.comment, uniqueId, createdAt: new Date(), owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
          // Optionally, refetch or update comments list to include the new comment
        }
      },
    );
  };

  let fRef = null;

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Add a Comment</h2>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="comment" />
            <SubmitField id="submit-comment" />
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="uniqueId" value={uniqueId} />
            <HiddenField name="createdAt" value={new Date()} />
          </AutoForm>
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

CommentPage.propTypes = {
  owner: PropTypes.string.isRequired,
  uniqueId: PropTypes.string,
};

CommentPage.defaultProps = {
  uniqueId: '',
};

export default CommentPage;

import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, SubmitField, TextField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import PropTypes from 'prop-types';
import { Comments } from '../../api/comment/CommentCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  comment: String,
  owner: String,
  createdAt: Date,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddComment page for adding a comment. */
const AddComment = ({ owner }) => {
  console.log('AddComment props:', { owner });
  // On submit, insert the data.
  const submit = (data, formRef) => {
    console.log('owner received in AddComment:', owner);
    console.log('Inserting data into CommentsCollection:', data);
    Comments.collection.insert(
      { comment: data.comment, createdAt: new Date(), owner },
      (error) => {
        if (error) {
          console.log('Inserting data into CommentsCollection2:', data);
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Comment added successfully', 'success');
          formRef.reset();
        }
      },
    );
  };

  let fRef = null;
  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12}>
          <Col className="text-center" />
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <TextField name="comment" />
            <SubmitField id="submit-post" />
            <ErrorsField />
            <HiddenField name="owner" value={owner} />
            <HiddenField name="createdAt" value={new Date()} />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddComment;

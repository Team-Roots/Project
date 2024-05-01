import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import swal from 'sweetalert';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const AddComment = ({ owner }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (comment.trim()) {
      const commentData = {
        comment,
        owner,
        createdAt: new Date(),
      };

      Meteor.call('comments.insert', commentData, (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          setComment(''); // Clear the input field after successful submission
        }
      });
    } else {
      swal('Error', 'Comment cannot be empty', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={12}>
          <h3>CHAT</h3>
          <form onSubmit={handleSubmit}>
            <InputGroup>
              <FormControl
                placeholder=""
                aria-label=""
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="outline-secondary" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </Button>
            </InputGroup>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

AddComment.propTypes = {
  owner: PropTypes.string.isRequired,
};

export default AddComment;

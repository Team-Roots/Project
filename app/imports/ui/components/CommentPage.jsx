// imports/ui/CommentPage.jsx
import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, ListGroup, Form, Button } from 'react-bootstrap';

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Function to fetch comments from the server
    const fetchComments = () => {
      Meteor.call('comments.fetch', (error, fetchedComments) => {
        if (error) {
          console.error('Failed to fetch comments:', error);
        } else {
          setComments(fetchedComments);
        }
      });
    };

    fetchComments(); // Fetch comments when the component mounts
  }, []); // Empty dependency array means this effect runs only once after initial render

  const handleCommentSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Simple validation to ensure comment text isn't just whitespace
    if (!commentText.trim()) {
      alert('Please enter a comment before submitting.');
      return;
    }

    // Call the Meteor method to add a new comment
    Meteor.call('comments.add', { text: commentText, createdAt: new Date() }, (error) => {
      if (error) {
        console.error('Failed to add comment:', error);
      } else {
        setCommentText(''); // Clear the input field after successful submission
        // Re-fetch comments to update the list with the new comment
        Meteor.call('comments.fetch', (fetchError, fetchedComments) => {
          if (fetchError) {
            console.error('Failed to fetch comments:', fetchError);
          } else {
            setComments(fetchedComments);
          }
        });
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Add a Comment</h2>
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3" controlId="formCommentText">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your comment here"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h2>Comments</h2>
          <ListGroup>
            {comments.map((comment, index) => (
              <ListGroup.Item key={index}>
                <strong>Date:</strong> {comment.createdAt.toString()}
                <br />
                <strong>Comment:</strong> {comment.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CommentPage;

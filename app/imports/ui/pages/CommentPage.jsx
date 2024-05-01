import React from 'react';
import { useLocation } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Card } from 'react-bootstrap';
import AddComment from '../components/AddComment';
import { Comments } from '/imports/api/comment/CommentCollection';

const CommentPage = () => {
  const location = useLocation();
  const { owner } = location.state || { owner: Meteor.userId() };

  const { comments, usersReady } = useTracker(() => {
    const commentsHandle = Meteor.subscribe('userComments', owner); // Your comment subscription
    const usersHandle = Meteor.subscribe('userNames'); // User names subscription

    if (commentsHandle.ready() && usersHandle.ready()) {
      // eslint-disable-next-line no-shadow
      const comments = Comments.find({}).fetch();
      const commentsWithUsernames = comments.map(comment => {
        // Assuming `username` is available on the user documents
        const user = Meteor.users.findOne(comment.owner, { fields: { username: 1 } });
        return { ...comment, username: user?.username || 'Unknown' };
      });

      return { comments: commentsWithUsernames, usersReady: true };
    }

    return { comments: [], usersReady: false };
  }, [owner]);

  return (
    <Container>
      <Row>
        <AddComment owner={Meteor.userId()} />
        <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
          {usersReady ? (
            comments.map(comment => (
              <Card key={comment._id} className="mb-2">
                <Card.Body>
                  <Card.Title>{comment.username}</Card.Title>
                  <Card.Text>
                    {comment.comment}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </Row>
    </Container>
  );
};

export default CommentPage;

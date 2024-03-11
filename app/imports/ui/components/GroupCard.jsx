import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GroupCard = ({ group }) => {
  const sinceDate = group.groupDate ? group.groupDate.toDateString('en-US', {
    year: 'numeric',
  }) : 'Date not set';
  const user = Meteor.user();
  const owner = user ? user.username : null;

  return (
    <Card className="mb-3" id="colorCard">
      <Card className="mb-3" id="colorCard" style={{ width: '100%' }}>
        <Card.Body>
          <Row>
            <Col>
              <Card.Title className="poppinsText">{group.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted robotoText">{sinceDate}</Card.Subtitle>
              <Card.Text className="robotoText">{group.description}</Card.Text>
              <Card.Text className="robotoText">Members: {group.members}</Card.Text>
            </Col>
            <Col>
              <Image src={group.image} className="imageContain" />
            </Col>
          </Row>
          <br />
          <Row>
            <Col><Link to={`/groups/${group._id}`} className="btn btn-primary mx-1 robotoText edit">View group</Link></Col>
            <Col>{group.owner === owner && <Link to={`/edit-group/${group._id}`} className="btn btn-danger mx-1 robotoText">Edit</Link>}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Card>
  );
};

GroupCard.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    groupDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    coordinator: PropTypes.string,
    members: PropTypes.number,
    isOnline: PropTypes.bool,
    image: PropTypes.string,
    specialInstructions: PropTypes.string,
    // figure out what the data type of restrictions and ageRange are
    // restrictions
    // ageRange
    owner: PropTypes.string,
  }).isRequired,
};

export default GroupCard;

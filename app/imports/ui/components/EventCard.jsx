import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Row, Col, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = event.eventDate ? event.eventDate.toDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : 'Date not set';
  const user = Meteor.user();
  const owner = user ? user.username : null;

  return (
    <Card className="mb-3" id="colorCard">
      <Card.Body>
        <Row>
          <Col>
            <Card.Title className="poppinsText">{event.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted robotoText">{formattedDate}</Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted robotoText">{event.startTime} - {event.endTime}</Card.Subtitle>
            <Card.Text className="robotoText">{event.description}</Card.Text>
            <Card.Text className="robotoText">Location: {event.location}</Card.Text>
          </Col>
          <Col>
            <Image src={event.image} className="imageContain" />
          </Col>
        </Row>
        <br />
        <Row>
          <Col><Link to={`/events/${event._id}`} className="btn btn-primary mx-1 robotoText edit">More Details</Link></Col>
          <Col>{event.owner === owner && <Link to={`/edit-event/${event._id}`} className="btn btn-danger mx-1 robotoText">Edit</Link>}</Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    coordinator: PropTypes.string,
    amountVolunteersNeeded: PropTypes.number,
    isOnline: PropTypes.bool,
    image: PropTypes.string,
    specialInstructions: PropTypes.string,
    // figure out what the data type of restrictions and ageRange are
    // restrictions
    // ageRange
    owner: PropTypes.string,
  }).isRequired,
};

export default EventCard;

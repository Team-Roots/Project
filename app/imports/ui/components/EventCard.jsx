import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = event.eventDate ? event.eventDate.toDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : 'Date not set';
  const user = Meteor.user();
  const owner = user ? user.username : null;

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formattedDate}</Card.Subtitle>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Location: {event.location}</Card.Text>
        <Card.Text>Coordinator: {event.coordinator}</Card.Text>
        {/* <Link to={`/edit-event/${event._id}`} className="btn btn-primary">Edit</Link> */}
        {event.owner === owner && <Button href={`/edit-event/${event._id}`} variant="outline-success" className="mx-1">Edit Event</Button>}
        {event.owner === owner && <Button className="mx-1" variant="danger">Delete Event</Button>}
      </Card.Body>
    </Card>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    coordinator: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    amountVolunteersNeeded: PropTypes.number,
    owner: PropTypes.string,
  }).isRequired,
};

export default EventCard;

import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = event.eventDate ? event.eventDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  }) : 'Date not set';

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formattedDate}</Card.Subtitle>
        <Card.Text>
          {event.description}
        </Card.Text>
        <Card.Text>
          Location: {event.location}
        </Card.Text>
        <Card.Text>
          Coordinator: {event.coordinator}
        </Card.Text>
        {/* Replace the button with a Link component for navigation */}
        <Link to={`/edit-event/${event._id}`} className="btn btn-primary">Edit</Link>
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
    location: PropTypes.string,
    coordinator: PropTypes.string,
  }).isRequired,
};

export default EventCard;

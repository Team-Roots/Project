import React from 'react';
import { Card, Container, Image, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = event.eventDate ? event.eventDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : 'Date not set';

  return (
    <Card className="event-card mb-3">
      <Container className="event-image-container">
        <Image src={event.image} alt="Event Image" fluid />
      </Container>
      <Card.Body className="event-card-body">
        <Card.Title>{event.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{formattedDate}</Card.Subtitle>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Location: {event.location}</Card.Text>
        <Card.Text>Coordinator: {event.coordinator}</Card.Text>
        <Col>
          <Link to={`/edit-event/${event._id}`} className="btn btn-primary">Edit</Link>
          <Link to={`/events/${event._id}`} className="btn btn-primary">Detail</Link>
        </Col>
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
    image: PropTypes.string,
  }).isRequired,
};

export default EventCard;

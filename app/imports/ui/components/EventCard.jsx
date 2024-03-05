import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Card, Row, Col, Image, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  const formattedDate = event.eventDate ? event.eventDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'Date not set';
  const user = Meteor.user();
  const creator = user ? user.username : null;

  return (
    <Card className="mb-3" id="colorCard" style={{ height: '100%' }}>
      <Card.Body>
        <Image src={event.image} className="imageContain pb-2" />
        <Row className="text-center">
          <Card.Title className="poppinsText">{event.name}</Card.Title>
        </Row>
        <Row>
          <Card.Subtitle className="mb-2 text-muted robotoText">{formattedDate}</Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted robotoText">{event.startTime} - {event.endTime}</Card.Subtitle>
          <Card.Text className="robotoText">
            {event.description} <br />
            Location: {event.location}
          </Card.Text>
        </Row>
        <Row className="my-1">
          <ListGroup horizontal className="justify-content-center align-content-center pb-1">
            <ListGroup.Item className="m-1 robotoText eventLG">{event.category}</ListGroup.Item>
            {event.isOnline && <ListGroup.Item className="m-1 robotoText eventLG">Online</ListGroup.Item>}
            {!event.isOnline && <ListGroup.Item className="m-1 robotoText eventLG">In-Person</ListGroup.Item>}
            {/* <ListGroup.Item className="m-1 robotoText">{event.needBackgroundCheck}</ListGroup.Item> */}
          </ListGroup>
        </Row>
      </Card.Body>
      <Card.Footer>
        <Row>
          <Col><Link to={`/events/${event._id}`} className="btn btn-primary mx-1 robotoText edit">More Details</Link></Col>
          <Col>{event.creator === creator && <Link to={`/edit-event/${event._id}`} className="btn btn-danger mx-1 robotoText">Edit</Link>}</Col>
        </Row>
      </Card.Footer>
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
    creator: PropTypes.string,
  }).isRequired,
};

export default EventCard;

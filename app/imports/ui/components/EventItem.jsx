import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Container } from 'react-bootstrap';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Event table with Bootstrap styling. */
const EventItem = ({ event }) => {
  const displayDate = event.eventDate instanceof Date ? event.eventDate.toDateString() : 'N/A';
  const displayStartTime = event.startTime || 'N/A';
  const displayEndTime = event.endTime || 'N/A';
  const displayVolunteers = event.amountVolunteersNeeded !== undefined ? event.amountVolunteersNeeded : 'N/A';

  return (
    <tr>
      <td>{event.name}</td>
      <td>{displayDate}</td>
      <td>{event.category}</td>
      <td>{displayStartTime}</td>
      <td>{displayEndTime}</td>
      <td>{event.location}</td>
      <td>{event.coordinator}</td>
      <td>{displayVolunteers}</td>
      <td>{event.specialInstructions}</td>
      <Container className="image-container">
        <Image src={event.image} alt="Event Image" fluid />
      </Container>
      <td>
        <Link className={`btn btn-sm btn-primary ${COMPONENT_IDS.LIST_EVENT_EDIT}`} to={`/edit-event/${event._id}`}>Edit</Link>
      </td>
    </tr>
  );
};

EventItem.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    category: PropTypes.string.isRequired,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    location: PropTypes.string.isRequired,
    coordinator: PropTypes.string.isRequired,
    amountVolunteersNeeded: PropTypes.number,
    specialInstructions: PropTypes.string,
    // eslint-disable-next-line no-unused-vars,react/forbid-prop-types
    restrictions: PropTypes.object,
    image: PropTypes.string,
  }).isRequired,
};

export default EventItem;

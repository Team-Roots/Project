import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Event table. */
const EventItem = ({ event }) => {
  console.log(event);
  // Check if eventDate is a valid date and convert it to a string.
  const displayDate = event.eventDate instanceof Date ? event.eventDate.toDateString() : 'N/A';

  return (
    <tr>
      <td>{event.name}</td>
      <td>{displayDate}</td>
      <td>{event.location}</td>
      <td>
        <Link className={COMPONENT_IDS.LIST_EVENT_EDIT} to={`/edit-event/${event._id}`}>Edit</Link>
      </td>
    </tr>
  );
};

// Require a document to be passed to this component.
EventItem.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    eventLocation: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventItem;

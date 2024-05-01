import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Event table with Bootstrap styling. */
const EventItem = ({ event, onDelete }) => {
  const displayDate = event.eventDate instanceof Date ? event.eventDate.toDateString() : 'N/A';
  const displayStartTime = event.startTime || 'N/A';
  const displayEndTime = event.endTime || 'N/A';
  const displayVolunteers = event.amountVolunteersNeeded !== undefined ? event.amountVolunteersNeeded : 'N/A';

  // Function to handle the deletion of an event
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${event.name}?`)) {
      onDelete(event._id); // Call the passed delete function with the event's _id
    }
  };

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
      <td>
        <div className="btn-group" role="group">
          <Link className={`btn btn-sm btn-primary ${COMPONENT_IDS.LIST_EVENT_EDIT}`} to={`/edit-event/${event._id}`}>Edit</Link>
          {/* eslint-disable-next-line react/button-has-type */}
          <button className="btn btn-sm btn-danger" onClick={handleDelete} style={{ marginLeft: '5px' }}>Delete</button>
        </div>
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
  }).isRequired,
  onDelete: PropTypes.func.isRequired, // Ensure to pass onDelete from parent component
};

export default EventItem;

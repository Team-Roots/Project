import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List Event table. */
const EventItem = ({ event }) => (
  <tr>
    <td>{event.eventName}</td>
    <td>{event.eventDate.toDateString()}</td>
    <td>{event.eventLocation}</
      td>
    <td>
      <Link className={COMPONENT_IDS.LIST_EVENT_EDIT} to={`/edit-event/${event._id}`}>Edit</Link>
    </td>
  </tr>
);
// Require a document to be passed to this component.
EventItem.propTypes = {
  event: PropTypes.shape({
    eventName: PropTypes.string,
    eventDate: PropTypes.instanceOf(Date),
    eventLocation: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default EventItem;
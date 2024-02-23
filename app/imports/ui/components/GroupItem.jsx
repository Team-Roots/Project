import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';

/** Renders a single row in the List group table with Bootstrap styling. */
const GroupItem = ({ group }) => {
  const displayDate = group.groupDate instanceof Date ? group.groupDate.toDateString() : 'N/A';
  const displayStartTime = group.startTime || 'N/A';
  const displayEndTime = group.endTime || 'N/A';
  const displayVolunteers = group.amountVolunteersNeeded !== undefined ? group.amountVolunteersNeeded : 'N/A';

  return (
    <tr>
      <td>{group.name}</td>
      <td>{displayDate}</td>
      <td>{group.category}</td>
      <td>{displayStartTime}</td>
      <td>{displayEndTime}</td>
      <td>{group.location}</td>
      <td>{group.coordinator}</td>
      <td>{displayVolunteers}</td>
      <td>{group.specialInstructions}</td>
      <td>
        <Link className={`btn btn-sm btn-primary ${COMPONENT_IDS.LIST_GROUP_EDIT}`} to={`/edit-group/${group._id}`}>Edit</Link>
      </td>
    </tr>
  );
};

GroupItem.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    groupDate: PropTypes.instanceOf(Date),
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
};

export default GroupItem;

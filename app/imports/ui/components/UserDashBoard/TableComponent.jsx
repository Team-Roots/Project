import React from 'react';

// eslint-disable-next-line react/prop-types
const TableComponent = ({ index, orgName, eventName, startTime, endTime }) => {
  // eslint-disable-next-line react/prop-types
  const totalTime = Math.abs((startTime.getHours() + (startTime.getMinutes() / 60)) - (endTime.getHours() + (endTime.getMinutes() / 60)));
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{orgName}</td>
      <td>{eventName}</td>
      <td>{totalTime.toFixed(1)} hrs</td>
    </tr>
  );
};

export default TableComponent;

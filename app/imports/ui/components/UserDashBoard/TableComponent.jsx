import React from 'react';

// eslint-disable-next-line react/prop-types
const TableComponent = ({ index, orgName, eventName, startTime, endTime }) => {
  console.log(orgName);
  return (
    <tr>
      <td>{index}</td>
      <td>{orgName}</td>
      <td>{eventName}</td>
      <td>{startTime - endTime} hrs</td>
    </tr>
  );
};

export default TableComponent;

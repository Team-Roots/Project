import React from 'react';

const TableComponent = (index, orgName, eventName, hoursOfEvent) => {
  return (
    <tr>
      <td>{index}</td>
      <td>{orgName}</td>
      <td>{eventName}</td>
      <td>{hoursOfEvent}</td>
    </tr>
  );
};

export default TableComponent;

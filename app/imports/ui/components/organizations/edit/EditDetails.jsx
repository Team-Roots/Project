import React from 'react';
import OrganizationPropTypes from '../../../../api/organization/OrganizationPropTypes';
// TODO
const EditDetails = ({ organization }) => {
  console.log(organization);
  return <h3>edit details</h3>;
};

EditDetails.propTypes = OrganizationPropTypes;

export default EditDetails;

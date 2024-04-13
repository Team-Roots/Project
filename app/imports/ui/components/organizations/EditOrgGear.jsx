import React from 'react';
import { Gear } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

const EditOrgGear = ({ orgID }) => (
  <Link to={`/organizations/${orgID}/edit`} style={{ color: 'black' }}><Gear size="1.25rem" /></Link>
);

EditOrgGear.propTypes = {
  orgID: Number.isRequired,
};

export default EditOrgGear;

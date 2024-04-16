import React from 'react';
import { TextField, SelectField, NumField, BoolField } from 'uniforms-bootstrap5';
import PropTypes from 'prop-types';
import CustomDateField from './CustomDateField';
import AddressInput from './AddressInput'; // Ensure this is correctly imported
import OrganizationPropTypes from '../../api/organization/OrganizationPropTypes';

const BasicEventDetails = ({ categoryOptions, organizationName, onAddressSelect, onChange }) => (
  <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
    <TextField name="name" placeholder="Event Name" label="Event Name" />
    <CustomDateField onChange={onChange} placeholder="Event Date" />
    <TextField name="description" placeholder="Event Description" label="Event Description" />
    <SelectField name="category" options={categoryOptions} placeholder="Select category" label="Category" />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="location">Location</label>
    <AddressInput name="location" onAddressSelect={onAddressSelect} label="Location" />
    <BoolField name="isOnline" label="Is Online Event?" />
    <div style={{ display: 'flex' }}>
      <NumField name="ageRange.min" label="Minimum Age" />
      <NumField name="ageRange.max" label="Maximum Age" />
    </div>
  </div>
);

BasicEventDetails.propTypes = {
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  organizationName: PropTypes.string.isRequired,
  onAddressSelect: PropTypes.func.isRequired, // Ensure this line is added
  onChange: PropTypes.func.isRequired,
};

export default BasicEventDetails;

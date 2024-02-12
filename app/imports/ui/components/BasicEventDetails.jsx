import React, { useState } from 'react';
import { TextField, SelectField } from 'uniforms-bootstrap5';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import AddressInput from './AddressInput';

// Modified to include label
const CustomDateField = ({ onChange, placeholder }) => {
  const [startDate] = useState(new Date());

  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="eventDate">Event Date</label>
      <DatePicker
        id="eventDate"
        selected={startDate}
        onChange={(date) => onChange('eventDate', date)}
        dateFormat="yyyy/MM/dd"
        placeholderText={placeholder}
        className="form-control"
      />
    </div>
  );
};

CustomDateField.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CustomDateField.defaultProps = {
  placeholder: 'Select a date', // Provide a default placeholder value
};

const BasicEventDetails = ({ categoryOptions, onAddressSelect }) => (
  <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
    <TextField name="name" placeholder="Event Name" label="Event Name" />
    <CustomDateField placeholder="Select event date" />
    <TextField name="description" placeholder="Event Description" label="Event Description" />
    <SelectField name="category" options={categoryOptions} placeholder="Select category" label="Category" />
    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
    <label htmlFor="location">Location</label>
    <AddressInput name="location" onAddressSelect={onAddressSelect} label="Location" />
  </div>
);

BasicEventDetails.propTypes = {
  categoryOptions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  onAddressSelect: PropTypes.func,
};

BasicEventDetails.defaultProps = {
  onAddressSelect: () => {}, // Default prop for onAddressSelect
};

export default BasicEventDetails;

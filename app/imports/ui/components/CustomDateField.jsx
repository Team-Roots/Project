import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import PropTypes from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';

const CustomDateField = ({ onChange, placeholder }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="form-group" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="eventDate">Event Date</label>
      <DatePicker
        id="eventDate"
        selected={startDate}
        onChange={date => {
          setStartDate(date);
          onChange('eventDate', date);
        }}
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
  placeholder: 'Select a date',
};

export default CustomDateField;

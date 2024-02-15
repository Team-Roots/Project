// AdditionalInformation.jsx
import React from 'react';
import { NumField, LongTextField, TextField } from 'uniforms-bootstrap5';
import PropTypes from 'prop-types';

import UploadWidget from './UploadWidget';

const AdditionalInformation = ({ setUrl }) => (
  <>
    <NumField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
    <TextField name="restrictions" placeholder="Restrictions" label="Restrictions" />
    <LongTextField name="specialInstructions" placeholder="Special Instructions" />
    <UploadWidget setUrl={setUrl} name="image" />
  </>
);

AdditionalInformation.propTypes = {
  setUrl: PropTypes.func.isRequired,
};

export default AdditionalInformation;

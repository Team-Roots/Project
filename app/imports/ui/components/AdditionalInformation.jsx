// AdditionalInformation.jsx
import React from 'react';
import { NumField, LongTextField } from 'uniforms-bootstrap5';
import PropTypes from 'prop-types';

import UploadWidget from './UploadWidget';

const AdditionalInformation = ({ setUrl }) => (
  <>
    <NumField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
    <LongTextField name="specialInstructions" placeholder="Special Instructions" />
    <UploadWidget setUrl={setUrl} name="image" />
  </>
);

AdditionalInformation.propTypes = {
  setUrl: PropTypes.func.isRequired,
};

export default AdditionalInformation;

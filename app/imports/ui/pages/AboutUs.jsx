import React from 'react';
// eslint-disable-next-line no-unused-vars
import Odometer from 'react-odometerjs';
// eslint-disable-next-line no-unused-vars
import { Row, Col } from 'react-bootstrap';
import 'odometer/themes/odometer-theme-digital.css'; // Digital theme for Odometer

const AboutUs = () => (
  <div>
    <h1>About Us</h1>
    <Row>
      <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
      {/* Remember to replace the Odometer value prop with dynamic or state-based values if needed */}
    </Row>
  </div>
);

export default AboutUs;

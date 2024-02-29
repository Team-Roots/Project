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
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5 style={{ textDecoration: 'none' }}>Hours Served</h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Persons Served</h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Rides Shared</h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Communities Changed</h5>
      </Col>
    </Row>
  </div>
);

export default AboutUs;

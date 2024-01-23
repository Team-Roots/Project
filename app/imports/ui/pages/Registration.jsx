import React from 'react';
import { Container, Row } from 'react-bootstrap';
import RegistrationCard from '../components/RegistrationCard';

const Registration = () => (
  <Container>
    <Row>
      <h2 className="text-center">Volunteer Event Registration</h2>
    </Row>
    <Row>
      <RegistrationCard />
    </Row>
  </Container>
);

export default Registration;

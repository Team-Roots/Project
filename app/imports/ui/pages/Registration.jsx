import React from 'react';
import RegistrationCard from '../components/RegistrationCard';
import { Container, Row } from 'react-bootstrap';

const Registration = () => {
  return (
    <Container>
      <Row>
        <h2 className="text-center">Volunteer Event Registration</h2>
      </Row>
      <Row>
        <RegistrationCard />
      </Row>
    </Container>
  );
};

export default Registration;
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
// import { RadioField, AutoForm } from 'uniforms-bootstrap5';
import EventCard from '../components/EventCard';

const VolunteerEventOpportunities = () => (
  <Container className="py-3">
    <Row>
      <h2 className="text-center">Volunteer Event Opportunities</h2>
    </Row>
    <Row>
      <Col md={2} lg={2}>
        <h3>Filter By:</h3>
        <h4>Location</h4>
        <p>Within 1 Mile</p>
        <p>Within 5 Miles</p>
        <p>Within 10 Miles</p>
        <h4>Category</h4>
        <p>Animal Shelter</p>
        <p>Clean Up</p>
        <p>Food Distribution</p>
        <h4>Need Background Check</h4>
      </Col>
      <Col>
        <Row md={2} lg={2}>
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </Row>
      </Col>
    </Row>
  </Container>
);

export default VolunteerEventOpportunities;

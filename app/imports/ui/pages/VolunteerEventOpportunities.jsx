import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventCard from '../components/EventCard';

const VolunteerEventOpportunities = () => (
  <Container className="py-3">
    <Row>
      <h2 className="text-center">Volunteer Event Opportunities</h2>
    </Row>
    <Row>
      <Col md={2} lg={2}>
        <h3>Filter By</h3>
      </Col>
      <Col>
        <Row md={2} lg={2} className="gx-4">
          <EventCard />
          <EventCard />
        </Row>
      </Col>
    </Row>
  </Container>
);

export default VolunteerEventOpportunities;

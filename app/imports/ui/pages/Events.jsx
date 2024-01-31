import React from 'react';
import { Container, Row, Col, FormCheck } from 'react-bootstrap';
// import { RadioField, AutoForm } from 'uniforms-bootstrap5';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
// import EventCard from '../components/EventCard';

const Events = () => (
  <Container className="py-3">
    <Row>
      <h2 className="text-center">Volunteer Event Opportunities</h2>
    </Row>
    <Row>
      <Col md={2} lg={2}>
        <h3>Filter By</h3>
        <h4>Location</h4>
        <FormCheck>
          <FormCheckInput type="radio" />
          <FormCheckLabel>Within 1 Mile</FormCheckLabel>
        </FormCheck>
        <FormCheck>
          <FormCheckInput type="radio" />
          <FormCheckLabel>Within 5 Miles</FormCheckLabel>
        </FormCheck>
        <FormCheck>
          <FormCheckInput type="radio" />
          <FormCheckLabel>Within 10 Miles</FormCheckLabel>
        </FormCheck>
        <h4>Category</h4>
        <FormCheck>
          <FormCheckInput type="checkbox" />
          <FormCheckLabel>Animal Shelter</FormCheckLabel>
        </FormCheck>
        <FormCheck>
          <FormCheckInput type="checkbox" />
          <FormCheckLabel>Clean Up</FormCheckLabel>
        </FormCheck>
        <FormCheck>
          <FormCheckInput type="checkbox" />
          <FormCheckLabel>Food Distribution</FormCheckLabel>
        </FormCheck>
        <br />
        <FormCheck>
          <FormCheckInput type="checkbox" />
          <FormCheckLabel>
            <h5>Need Background Check</h5>
          </FormCheckLabel>
        </FormCheck>
      </Col>
      <Col>
        {/* TODO: Add Event Card */}
        <Row md={2} lg={2} className="m-1">
          Insert Event Card Here
        </Row>
      </Col>
    </Row>
  </Container>
);

export default Events;

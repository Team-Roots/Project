// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const RegistrationForm = () => (
  <Container>
    <Row className="justify-content-center my-5">
      <Col lg={6}>
        <Card>
          <Card.Header as="h2" className="text-center bg-primary text-white">Volunteer Registration</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" id="fullName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  placeholder="Enter full name"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" id="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" id="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" id="availability">
                <Form.Label>Availability</Form.Label>
                <Form.Control
                  as="textarea"
                  name="availability"
                  rows={3}
                  placeholder="Let us know when you are available to volunteer"
                />
              </Form.Group>

              <Form.Group className="mb-3" id="skills">
                <Form.Label>Skills and Interests</Form.Label>
                <Form.Control
                  as="textarea"
                  name="skills"
                  rows={3}
                  placeholder="Describe any special skills and interests"
                />
              </Form.Group>

              <Form.Group className="mb-3" id="comments">
                <Form.Label>Additional Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  name="comments"
                  rows={3}
                  placeholder="Any additional comments"
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit Registration
              </Button>

            </Form>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegistrationForm;

import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';

/* A simple static component to render some text for the contact us page. */

const ContactUs = () => (
  <Container fluid style={{ padding: 0 }}>
    <Container
      fluid
      className="d-flex align-items-center justify-content-center"
      style={{
        background: '#02B5A6',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100px',
        color: 'white',
        textAlign: 'center',
        overflowY: 'auto',
        padding: 0,
      }}
    >
      <div>
        <h1> Contact Us </h1>
      </div>
    </Container>
    <Container className="d-flex shadow" style={{ padding: 20, marginTop: 20, marginBottom: 20, borderRadius: '10px' }}>
      <Row>
        <Col md={3}>
          <div style={{ overflow: 'hidden' }}>
            <Image src="/images/Voluntree.logo-noG.png" alt="Volunteers" fluid />
          </div>
        </Col>
        <Col md={7}>
          <h2>Reach out to us via email!</h2>
          <p>If you have a question or wish for us to contact a volunteer group on your behalf, just drop us an email detailing your needs, and we will respond as soon as possible!</p>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email here" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  </Container>
);

export default ContactUs;

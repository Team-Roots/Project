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
            <Image src="/images/contactus.png" alt="Volunteers" fluid />
          </div>
        </Col>
        <Col md={7}>
          <h2>Send us an email!</h2>
          <p>Have an inquiry? Want us to send an invite to a volunteering organization? Send us an email with your requests and we will get back to you when we can!</p>
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

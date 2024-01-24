import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col className="footer-center" xs={12} md={4}>
          <h5>Resources</h5>
          <a href="https://www.google.com/?client=safari">About Us</a>
          <br />
          <a href="https://www.google.com/?client=safari">Contact Us</a>
        </Col>

        {/* Right Section */}
        <Col className="footer-right" xs={12} md={4}>
          <h5>Grow the Community</h5>
          <a href="https://www.google.com/?client=safari">Home</a>
          <br />
          <a href="https://www.google.com/?client=safari">Volunteer</a>
          <br />
          <a href="https://www.google.com/?client=safari">Post an Event</a>
        </Col>

        <Col className="footer-left" xs={12} md={4}>
          <h5>Voluntree</h5>
          <p>
            Where individuals come together, plant the seeds of compassion, and watch as the collective efforts grow into a flourishing forest of shared impact.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="px-3 text-center">
          <p>© 2024 Voluntree</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Row>
        <Col className="footer-center" xs={12} md={4}>
          <h5>Resources</h5>
          <Link to="/aboutus">About Us</Link>
          <br />
          <Link to="/questions">FAQ</Link
          <Link to="/faq">FAQ</Link>
          <br />
          <a href="https://www.google.com/?client=safari">Contact Us</a>
        </Col>

        <Col className="footer-right" xs={12} md={4}>
          <h5>Grow the Community</h5>
          <Link to="Home">Home</Link>
          <br />
          <Link to="/eventopportunities">Volunteer</Link>
          <br />
          <a href="https://www.google.com/?client=safari">Post an Event</a>
          <br />
          <a href="https://www.google.com/?client=safari">Community Groups</a>
        </Col>

        <Col className="footer-left" xs={12} md={4}>
          <h5>Voluntree</h5>
          <p>
            Where individuals come together, plant the seeds of compassion, and watch as the collective efforts grow into a flourishing forest of shared impact.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="px-3 bi-text-left">
          <p>© 2024 Voluntree</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

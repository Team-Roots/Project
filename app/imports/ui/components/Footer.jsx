import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="mt-auto py-3" style={{ backgroundColor: '#02B5A6' }}>
    <Container>
      <Row className="text-white">
        <Col xs={12} md={4}>
          <h5 className="footer-heading">Resources</h5>
          <ul>
            <li><Link to="/aboutus">About Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><a href="mailto:contact@voluntree.com" aria-label="Contact Us">Contact Us</a></li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <h5 className="footer-heading">Grow the Community</h5>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/volunteer">Volunteer</Link></li>
            <li><Link to="/post-event">Post an Event</Link></li>
            <li><Link to="/community-groups">Community Groups</Link></li>
          </ul>
        </Col>

        <Col xs={12} md={4}>
          <h5 className="footer-heading">Voluntree</h5>
          <p>
            Where individuals come together, plant the seeds of compassion, and watch as the collective efforts grow into a flourishing forest of shared impact.
          </p>
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="text-center text-muted">
          <p>© 2024 Voluntree. All rights reserved.</p>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
